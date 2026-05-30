import { useState, useEffect, useRef, useCallback } from "react";
import { IconPlayerPlay, IconPlayerPause, IconRefresh, IconFlag } from "@tabler/icons-react";

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {}
}

function haptic() {
  try { navigator.vibrate?.([200, 80, 200, 80, 400]); } catch {}
}

function fmtSw(ms) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

function fmtRest(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

const PRESETS = [30, 45, 60, 90, 120];

export default function Timer() {
  // --- Stopwatch ---
  const [swMs, setSwMs] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const swAcc = useRef(0);
  const swStart = useRef(0);
  const swRaf = useRef(null);

  // --- Rest timer ---
  const [restMs, setRestMs] = useState(60000);
  const [restRunning, setRestRunning] = useState(false);
  const restPreset = useRef(60000);
  const restAcc = useRef(60000);
  const restStart = useRef(0);
  const restRaf = useRef(null);

  // --- WakeLock ---
  const wakeLock = useRef(null);
  const acquireWL = async () => {
    try { wakeLock.current = await navigator.wakeLock?.request("screen"); } catch {}
  };
  const releaseWL = () => { wakeLock.current?.release(); wakeLock.current = null; };

  // Stopwatch tick
  const swTick = useCallback(() => {
    setSwMs(swAcc.current + performance.now() - swStart.current);
    swRaf.current = requestAnimationFrame(swTick);
  }, []);

  const swPlay = () => {
    swStart.current = performance.now();
    setSwRunning(true);
    swRaf.current = requestAnimationFrame(swTick);
    acquireWL();
  };

  const swPause = () => {
    cancelAnimationFrame(swRaf.current);
    swAcc.current += performance.now() - swStart.current;
    setSwRunning(false);
  };

  const swReset = () => {
    cancelAnimationFrame(swRaf.current);
    swAcc.current = 0;
    setSwMs(0);
    setSwRunning(false);
    setLaps([]);
    releaseWL();
  };

  const swLap = () => {
    const now = swRunning
      ? swAcc.current + performance.now() - swStart.current
      : swAcc.current;
    if (now > 0) setLaps((p) => [...p, now]);
  };

  // Rest timer tick
  const restTick = useCallback(() => {
    const remaining = restAcc.current - (performance.now() - restStart.current);
    if (remaining <= 0) {
      setRestMs(0);
      setRestRunning(false);
      beep();
      haptic();
    } else {
      setRestMs(remaining);
      restRaf.current = requestAnimationFrame(restTick);
    }
  }, []);

  const restPlay = () => {
    if (restMs <= 0) return;
    restAcc.current = restMs;
    restStart.current = performance.now();
    setRestRunning(true);
    restRaf.current = requestAnimationFrame(restTick);
    acquireWL();
  };

  const restPause = () => {
    cancelAnimationFrame(restRaf.current);
    restAcc.current = restMs;
    setRestRunning(false);
  };

  const restReset = (preset = restPreset.current) => {
    cancelAnimationFrame(restRaf.current);
    restAcc.current = preset;
    setRestMs(preset);
    setRestRunning(false);
  };

  const pickPreset = (s) => {
    const ms = s * 1000;
    restPreset.current = ms;
    restReset(ms);
  };

  useEffect(() => () => {
    cancelAnimationFrame(swRaf.current);
    cancelAnimationFrame(restRaf.current);
    releaseWL();
  }, []);

  const lapSplit = (i) => {
    const prev = i > 0 ? laps[i - 1] : 0;
    return laps[i] - prev;
  };

  const restUrgent = restRunning && restMs > 0 && restMs <= 5000;
  const restDone = restMs === 0;

  return (
    <div className="screen timer-screen">
      <h2 className="page-title timer-title">Chronomètre</h2>

      {/* ── Stopwatch display ── */}
      <div className="sw-display">
        <span className="sw-digits">{fmtSw(swMs)}</span>
      </div>

      <div className="sw-controls">
        {swRunning ? (
          <button className="tcl-btn tcl-pause" onClick={swPause}>
            <IconPlayerPause size={20} stroke={1.5} /> Pause
          </button>
        ) : (
          <button className="tcl-btn tcl-play" onClick={swPlay}>
            <IconPlayerPlay size={20} stroke={1.5} /> {swMs > 0 ? "Reprendre" : "Start"}
          </button>
        )}
        <button className="tcl-btn tcl-ghost" onClick={swLap} disabled={!swRunning && swMs === 0}>
          <IconFlag size={17} stroke={1.5} /> Tour
        </button>
        <button className="tcl-btn tcl-ghost" onClick={swReset} disabled={swMs === 0 && !swRunning}>
          <IconRefresh size={17} stroke={1.5} /> Reset
        </button>
      </div>

      {/* ── Laps ── */}
      {laps.length > 0 && (
        <div className="laps-list">
          <div className="laps-header">
            <span>Tour</span><span>Intermédiaire</span><span>Total</span>
          </div>
          {[...laps].reverse().map((total, ri) => {
            const i = laps.length - 1 - ri;
            return (
              <div key={i} className={`lap-row ${i === laps.length - 1 ? "lap-latest" : ""}`}>
                <span className="lap-num">T{i + 1}</span>
                <span className="lap-split">{fmtSw(lapSplit(i))}</span>
                <span className="lap-total">{fmtSw(total)}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Rest timer ── */}
      <div className="rest-section">
        <h3 className="section-title" style={{ color: "#aaa", marginTop: 0 }}>Timer de repos</h3>

        <div className="rest-presets">
          {PRESETS.map((s) => (
            <button
              key={s}
              className={`rest-preset ${restPreset.current === s * 1000 ? "active" : ""}`}
              onClick={() => pickPreset(s)}
            >
              {s < 60 ? `${s}s` : `${s / 60}min`}
            </button>
          ))}
        </div>

        <div className={`rest-display ${restUrgent ? "urgent" : ""} ${restDone ? "done" : ""}`}>
          <span className="rest-digits">{fmtRest(restMs)}</span>
          {restDone && <span className="rest-done-label">Repos terminé !</span>}
        </div>

        <div className="sw-controls">
          {restRunning ? (
            <button className="tcl-btn tcl-pause" onClick={restPause}>
              <IconPlayerPause size={20} stroke={1.5} /> Pause
            </button>
          ) : (
            <button className="tcl-btn tcl-play" onClick={restPlay} disabled={restMs <= 0}>
              <IconPlayerPlay size={20} stroke={1.5} /> {restMs === restPreset.current ? "Start repos" : "Reprendre"}
            </button>
          )}
          <button className="tcl-btn tcl-ghost" onClick={() => restReset()}>
            <IconRefresh size={17} stroke={1.5} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
