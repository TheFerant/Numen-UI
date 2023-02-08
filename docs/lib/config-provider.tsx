import React, { useMemo, useState } from "react";

import { ConfigContext, Configs } from "lib/config-context";
import { useRouter } from "next/router";

const defaultProps = {};

export type ConfigProviderProps = {
  onThemeChange?: (themes: object) => void;
  onThemeTypeChange?: (type: string) => void;
};

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> =
  React.memo(
    ({
      onThemeChange,
      onThemeTypeChange,
      children,
    }: React.PropsWithChildren<ConfigProviderProps> & typeof defaultProps) => {
      const { pathname } = useRouter();
      const [scrollHeight, setScrollHeight] = useState<number>(0);

      const updateSidebarScrollHeight = (height: number) =>
        setScrollHeight(height);

      const initialValue = useMemo<Configs>(
        () => ({
          onThemeChange,
          sidebarScrollHeight: scrollHeight,
          updateSidebarScrollHeight,
        }),
        [scrollHeight]
      );

      return (
        <ConfigContext.Provider value={initialValue}>
          {children}
        </ConfigContext.Provider>
      );
    }
  );

ConfigProvider.defaultProps = defaultProps;
ConfigProvider.displayName = "NumenConfigProvider";
export default ConfigProvider;
