# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-10

### 🚀 Major Rewrite

Complete modernization of ng-autosize for Angular 19+.

### Added

- ✅ Standalone directive support (Angular 15+ feature)
- ✅ Full TypeScript strict mode compliance
- ✅ Comprehensive unit test suite with Jasmine/Karma
- ✅ ESLint configuration for code quality
- ✅ Modern Angular Package Format (APF) build output
- ✅ GitHub Actions CI/CD pipeline
- ✅ Proper library project structure

### Changed

- **BREAKING:** Minimum Angular version is now 19.0.0
- **BREAKING:** Minimum TypeScript version is now 5.6.0
- **BREAKING:** Now a standalone directive (no NgModule export)
- Updated from Angular 2.0.0 to 19.0.0
- Updated from TypeScript 2.0.6 to 5.6.3
- Updated from RxJS 5.0.0-beta to 7.8.0
- Improved type safety with proper typing
- Enhanced code quality with ESLint
- Better performance with modern Angular APIs

### Removed

- NgModule export (use standalone imports instead)
- Support for Angular versions below 19
- Unused `_lastHeight` property

### Fixed

- TypeScript strict mode errors
- Code style inconsistencies
- Missing semicolons and type annotations
- Unused parameters in HostListener methods

### Migration Guide

See [README.md](README.md#migration-from-v1x) for detailed migration instructions.

---

## [1.1.0] - 2018-XX-XX

Last version supporting Angular 2-5.

### Features

- Basic autosize functionality
- Min/max height support
- NgModule-based architecture
