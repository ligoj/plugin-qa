# plugin-qa — Vue UI

Service-level plugin (`service:qa`, "Quality Assurance"), parent of the QA
tools (`qa-sonarqube`). Compiled to `webjars/qa/vue/`.

No routes/component (legacy controller was empty). Ships generic i18n +
`renderFeatures` / `renderDetailsKey` / `renderDetailsFeatures` delegation
hooks resolved via `subPluginIdFor` (`service:qa:sonarqube:1` →
`qa-sonarqube`).

```bash
npm install && npm run build && npm run lint && npm test
```
