# ng-autosize

**ng-autosize** is a modern Angular directive that automatically adjusts textarea height to fit content.

[![npm version](https://badge.fury.io/js/ng-autosize.svg)](https://www.npmjs.com/package/ng-autosize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✅ **Standalone directive** - No NgModule imports needed
- ✅ **Angular 19+ support** - Built with the latest Angular
- ✅ **TypeScript strict mode** - Type-safe and reliable
- ✅ **Automatic height adjustment** - Grows/shrinks with content
- ✅ **Min/Max height support** - Control textarea bounds
- ✅ **SSR compatible** - Works with server-side rendering
- ✅ **Lightweight** - Zero dependencies

## Installation

```bash
npm install ng-autosize
```

## Requirements

- **Angular:** 19.0.0 or higher
- **TypeScript:** 5.6.0 or higher

## Usage

### Standalone Component (Recommended)

Import the directive directly in your standalone component:

```typescript
import { Component } from '@angular/core';
import { Autosize } from 'ng-autosize';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Autosize],  // Import directive
  template: `
    <textarea autosize placeholder="Type here..."></textarea>
  `
})
export class ExampleComponent {}
```

### With NgModule (Legacy)

If you're still using NgModules:

```typescript
import { NgModule } from '@angular/core';
import { Autosize } from 'ng-autosize';

@NgModule({
  imports: [Autosize],  // Import as standalone
  // ...
})
export class AppModule {}
```

## Configuration Options

### Minimum Height

Set a minimum height for the textarea:

```html
<textarea autosize [minHeight]="100">
  This textarea has a minimum height of 100px
</textarea>
```

### Maximum Height

Set a maximum height for the textarea:

```html
<textarea autosize [maxHeight]="300">
  This textarea has a maximum height of 300px
</textarea>
```

### Both Min and Max

Combine both options:

```html
<textarea
  autosize
  [minHeight]="100"
  [maxHeight]="500"
  placeholder="Constrained between 100px and 500px">
</textarea>
```

## Migration from v1.x

ng-autosize v2.0 introduces breaking changes for Angular 19 compatibility.

### Breaking Changes

1. **Minimum Angular version:** Now requires Angular 19+
2. **Standalone-first:** No longer exports an NgModule
3. **TypeScript:** Requires TypeScript 5.6.0 or higher

### Migration Steps

**Before (v1.x):**
```typescript
import { Autosize } from 'ng-autosize';

@NgModule({
  declarations: [Autosize]  // Old way
})
```

**After (v2.x):**
```typescript
import { Autosize } from 'ng-autosize';

@Component({
  standalone: true,
  imports: [Autosize]  // New way
})
```

## How It Works

The directive:
1. Listens to `input` events on the textarea
2. Temporarily sets height to `auto` to measure scroll height
3. Adjusts the textarea height to match content
4. Respects min/max height constraints
5. Handles window resize events intelligently

## Browser Support

Supports all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Demo

[Live Demo](http://stevepapa.com/ng-autosize)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

[stevepapa](https://stevepapa.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
