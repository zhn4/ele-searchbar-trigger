# Trigger By Search Bar

A utility function for triggering actions based on search bar input.

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
