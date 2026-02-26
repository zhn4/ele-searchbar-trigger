# Trigger By Search Bar

可能是折叠/展开搜索栏的最便捷的方法

maybe the most convenient way to toggle collapse/expand search bar

## Installation

```bash
npm install trigger-by-search-bar
```

## Usage

```javascript
import triggerBySearchBar from 'trigger-by-search-bar';

// Example usage
triggerBySearchBar('formRef', ['field1', 'field2']);
```

## API

### `triggerBySearchBar(refName, blackList)`

- **refName**: `string` (default: `'formRef'`)
  - The reference name of the search bar form.
- **blackList**: `Array<string>`
  - A list of field props to hide when the search bar is in a small state.

## License

MIT
