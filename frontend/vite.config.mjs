import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

const jsAsJsx = {
  name: "js-as-jsx",
  enforce: "pre",
  async transform(code, id) {
    if (!/\/src\/.*\.js$/.test(id)) {
      return null;
    }

    return transformWithOxc(code, id, {
      lang: "jsx",
      jsx: {
        runtime: "automatic"
      }
    });
  }
};

export default defineConfig({
  plugins: [jsAsJsx, react()],
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        ".js": "jsx"
      }
    }
  }
});
