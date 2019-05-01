class TableRowUnion {};

const items: TableRowUnion[] = 
    Object.values(row).map((item) =>
        Array.isArray(item)
            ? 'View Details'
            : typeof item === 'string' && item.includes(',')
            ? `"${item.trim()}"`
            : item,
    );

Object.values()