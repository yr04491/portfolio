"use client";

import { useState, useCallback } from "react";
import { usePlayMode } from "@/context/PlayModeContext";
import { useKeySequence } from "@/hooks/useKeySequence";

export default function PlayModeAnnouncement() {
  const { activate } = usePlayMode();
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const handleActivate = useCallback(() => {
    activate();
    setVisible(true);
    setShow(true);

    setTimeout(() => setShow(false), 2500);
    setTimeout(() => setVisible(false), 3200);
  }, [activate]);

  useKeySequence("ss", handleActivate);

  if (!visible) return null;

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center px-4"
    >
      <div
        style={{
          width: "min(92vw, 900px)",
          minHeight: "min(40vh, 320px)",
          transform: show ? "scale(1)" : "scale(0.88)",
          opacity: show ? 1 : 0,
          transition: show
            ? "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out"
            : "transform 0.5s cubic-bezier(0.7, 0, 0.84, 0), opacity 0.4s ease-in",
          backgroundColor: "#0a0a0a",
          border: "2px solid #330000",
          borderLeft: "6px solid #ff0000",
          fontFamily: "monospace",
          padding: "40px 64px 40px 48px",
          boxShadow: "0 0 60px rgba(255, 0, 0, 0.15), inset 0 0 80px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            height: "2px",
            background: "linear-gradient(to right, #ff0000, transparent)",
            marginBottom: "24px",
          }}
        />

        <p
          style={{
            color: "#ff000066",
            fontSize: "20px",
            letterSpacing: "0.35em",
            marginBottom: "12px",
          }}
        >
          SYSTEM ALERT
        </p>

        <p
          style={{
            color: "#ff0000",
            fontSize: "36px",
            fontWeight: "bold",
            letterSpacing: "0.12em",
            lineHeight: 1.35,
          }}
        >
          ■ PLAY MODE: ACTIVATE ■
        </p>

        <p
          style={{
            color: "#cc000099",
            fontSize: "20px",
            letterSpacing: "0.18em",
            marginTop: "20px",
            lineHeight: 1.5,
          }}
        >
          DARK MODE / LANGUAGE CONTROLS UNLOCKED
        </p>

        <div
          style={{
            height: "2px",
            background: "linear-gradient(to right, #ff0000, transparent)",
            marginTop: "24px",
          }}
        />
      </div>
    </div>
  );
}
