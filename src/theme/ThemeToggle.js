import React from "react";
import { Tooltip } from "antd";
import {
  BulbOutlined,
  BulbFilled,
  DesktopOutlined,
} from "@ant-design/icons";
import useTheme from "./useTheme";
import "./ThemeToggle.scss";

const OPTIONS = [
  { key: "light", icon: <BulbOutlined />, label: "Light" },
  { key: "dark", icon: <BulbFilled />, label: "Dark" },
  { key: "system", icon: <DesktopOutlined />, label: "System" },
];

const ThemeToggle = ({ className = "", compact = false }) => {
  const { mode, setMode } = useTheme();

  return (
    <div
      className={`theme-toggle ${compact ? "theme-toggle--compact" : ""} ${className}`}
      role="group"
      aria-label="Theme selector"
    >
      {OPTIONS.map((opt) => {
        const active = mode === opt.key;
        return (
          <Tooltip key={opt.key} title={opt.label}>
            <button
              type="button"
              className={`theme-toggle__btn ${active ? "is-active" : ""}`}
              aria-pressed={active}
              aria-label={`${opt.label} mode`}
              onClick={() => setMode(opt.key)}
            >
              {opt.icon}
              {!compact && (
                <span className="theme-toggle__label">{opt.label}</span>
              )}
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
