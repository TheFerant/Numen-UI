import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import sx, { SxProp } from "../sx";
import { useBodyScroll, Button, Image, useMediaQuery, Tabs } from "components";

import { useTheme } from "../ThemeProvider";

import { addColorAlpha } from "components/utils/color";
import MenuIcon from "@geist-ui/icons/menu";
import MenuMobile from "./menu-mobile";

const StyledMenu = styled.div<SxProp>``;

const Menu: React.FC<unknown> = () => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [, setBodyHidden] = useBodyScroll(null, { delayReset: 300 });
  const isMobile = useMediaQuery("xs", { match: "down" });

  useEffect(() => {
    setBodyHidden(expanded);
  }, [expanded]);

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false);
    }
  }, [isMobile]);

  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => {
      const isLocked = document.body.style.overflow === "hidden";
      setIsLocked((last) => (last !== isLocked ? isLocked : last));
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        if (mutation.type !== "attributes") return;
        handler();
      });
    });

    observer.observe(document.body, {
      attributes: true,
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="menu-wrapper">
        <nav className="menu">
          <div className="content">
            {children}
            <div className="controls">
              {isMobile && (
                <Button
                  className="menu-toggle"
                  auto
                  type="abort"
                  onClick={() => setExpanded(!expanded)}
                >
                  <MenuIcon size="1.125rem" />
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      <MenuMobile expanded={expanded} />

      <style jsx>{`
        .menu-wrapper {
          height: var(--geist-page-nav-height);
        }
        .menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding-right: ${isLocked ? "var(--geist-page-scrollbar-width)" : 0};
          height: var(--geist-page-nav-height);
          //width: 100%;
          backdrop-filter: saturate(180%) blur(5px);
          background-color: ${addColorAlpha(theme.palette.background, 0.8)};
          box-shadow: ${theme.type === "dark"
            ? "0 0 0 1px #333"
            : "0 0 15px 0 rgba(0, 0, 0, 0.1)"};
          z-index: 999;
        }
        .tabs {
          flex: 1 1;
          padding: 0 ${theme.layout.gap};
        }
        .tabs :global(.content) {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Menu;
