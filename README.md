# Capybara

## Overview >>

This is a TypeScript library providing simple database mechanism supporting the features below:

- functional-rogramming-style basic CRUD operations
- searches that optimized by an index map in each table

## How to use it >>
### Create a data table
```javascript
import { Row } from '@pandazy/capybara';

interface MyRow extends Row {
  name: string;
}

const table: BasicTable<MyRow> = {
  rows: {},
  lastNewId: 0
};
```

or

```javascript
import { Row, basicTable } from '@pandazy/capybara';

interface MyRow extends Row {
  name: string;
}

const table = basicTable<MyRow>();
```

### Add new rows to a table
```javascript
const table = basicTable<MyRow>(); // { rows: {}, lastNewId: 0 }

const rows: MyRow[] = [
  { name: 'foo' },
  { name: 'bar' }
]

const { newRowKeys, updatedTable } = addRowsBasic<MyRow>(table, rows);

/*
  newRowKeys:
    ['1', '2']
  updatedTable:
    { rows: {
          '1': { name: 'foo' },
          '2': { name: 'bar' }
        },
        lastNewId: 2
    }
```

### Update rows
### Remove rows

### Add index to the table
#### Q:Why index?
A: Index helps improving searching performance. When searching by indexed combinations of fields, the search complexity is O(1), it is a time-honored database optimization strategy.
