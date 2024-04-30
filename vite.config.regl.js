// vite.config.js
import glsl from 'vite-plugin-glsl';
import dtsPlugin from 'vite-plugin-dts';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [glsl({
        include: ['**/*.glsl'],      // Default file extension
        compress: false,             // Compress output shader code
        watch: true,                 // Recompile shader on change
        root: 'src/glsl',        // Root directory for shader files
    }),
    dtsPlugin({ rollupTypes: true })],
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'WebGLPersonaGallery',
            fileName: (format) => `webgl-persona-gallery.regl.${format}.js`,
            formats: ['es'],
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {
                    regl: 'REGL'
                }
            }
        },
        outDir: 'dist-regl/',
    }
});