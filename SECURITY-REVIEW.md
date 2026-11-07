# Frontend dependency security review

Date: 2026-11-07

## Scope and verification

Scanned `front/package-lock.json` with Trivy 0.76.2 using:

```sh
trivy fs --scanners vuln --include-dev-deps --severity CRITICAL,HIGH front
```

The initial scan reported 15 High and 0 Critical findings. After updating the frontend dependencies, the same scan reported 0 findings. `npm ci --prefix front` and `npm run build --prefix front` also completed successfully.

## Trivy findings and remediation

| Package | Initial version | Vulnerabilities | Resolved version | Status |
|---|---:|---|---:|---|
| brace-expansion | 2.1.0 | CVE-2026-102276, CVE-2026-102278, CVE-2026-13149, CVE-2026-14257, CVE-2026-69152 | 2.1.7 | Fixed |
| browserslist | 4.28.2 | CVE-2026-73088, CVE-2026-73089 | 4.29.5 | Fixed |
| js-yaml | 4.1.1 | CVE-2026-59869, CVE-2026-84375, GHSA-5p4m-2wfm-xmqj | 4.3.2 | Fixed with a targeted npm override for `@redocly/openapi-core` |
| nanoid | 3.3.12 | CVE-2026-67213, CVE-2026-67214 | 3.3.20 | Fixed |
| postcss | 8.5.15 | CVE-2026-73646 | 8.5.32 | Fixed |
| source-map-js | 1.2.1 | CVE-2026-93749 | 1.2.2 | Fixed |
| vite | 5.4.21 | CVE-2026-112942 | 6.4.5 | Fixed |

## Additional npm audit findings

The separate npm audit check still reports 1 High, 4 Moderate, and 1 Low advisories. These were not part of Trivy's Critical/High findings:

| Package | Severity | Advisory | Status |
|---|---|---|---|
| zod 3.25.76 | High | GHSA-mrhx-c7xc-m3w5 | Not changed: npm reports the fix in Zod 4.6.6+, which is a major-version upgrade |
| @babel/core | Low | GHSA-4x5r-pxfx-6jf8 | Not changed |
| @remix-run/router | Moderate | GHSA-2j2x-hqr9-3h42 | Not changed |
| postcss-selector-parser | Moderate | GHSA-w9m9-85wc-3x92, GHSA-rj75-hqrm-r3gf | Not changed |
| react-router | Moderate | GHSA-wrjc-x8rr-h8h6, GHSA-337j-9hxr-rhxg, GHSA-2j2x-hqr9-3h42 | Not changed |
| react-router-dom | Moderate | GHSA-jjmj-jmhj-qwj2 | Not changed |
