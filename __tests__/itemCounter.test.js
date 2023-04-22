import itemCounter from '../src/modules/itemCounter.js';

describe('Item counter tests', () => {
  test('count one item inside array', () => {
    const sampleData = [
      {
        item_id: 1,
      },
    ];
    const itemCount = itemCounter(sampleData);
    expect(itemCount).toBe(1);
  });

  test('count two item inside array', () => {
    const sampleData = [
      {
        item_id: 1,
      },
      {
        item_id: 2,
      },
    ];

    expect(itemCounter(sampleData)).toBe(2);
  });

  test('Count many items in an arry', () => {
    const sampleData = [1, 2, 3, 4, 5, 6];

    expect(itemCounter(sampleData)).toBe(6);
  });

  test('check empty array have length 0', () => {
    const emptyArray = [];

    expect(itemCounter(emptyArray)).toBe(0);
  });
});
