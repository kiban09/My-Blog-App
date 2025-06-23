import React from "react";
import { IconButton, Tooltip } from "@mui/material";

type Props = {
  icon: React.ReactElement;
  tooltip: string;
  onClick?: () => void;
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
};

const IconButtonWithTooltip: React.FC<Props> = ({
  icon,
  tooltip,
  onClick,
  color = "default",
  size = "medium",
  disabled = false,
}) => {
  return (
    <Tooltip title={tooltip} arrow>
      <span> 
        <IconButton
          onClick={onClick}
          color={color}
          size={size}
          disabled={disabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default IconButtonWithTooltip;