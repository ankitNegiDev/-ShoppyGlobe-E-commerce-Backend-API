
# 📘 Nullish Coalescing Operator(`??`) in JavaScript

The **nullish coalescing operator(`??`)** is a logical operator that returns the **right - hand operand** when the **left - hand operand is `null` or`undefined`**, otherwise it returns the **left - hand operand**.

---

## ✅ Syntax

```js
let result = a ?? b;

```

- If`a` is **not null and not undefined**, then`result = a`.
- If`a` **is null or undefined**, then`result = b`.

---

## ✅ Example Usage

```js
const quantity = null;
const newQuantity = 5;

const value = quantity ?? newQuantity;
console.log(value); // Output: 5
```

In this case, since `quantity` is`null`, JavaScript uses`newQuantity`.

---

## ⚠️ Difference from`||`(Logical OR)

The `||` operator returns the **right - hand value** if the **left - hand value is falsy** (`false`, `0`, `''`, `NaN`, `null`, or`undefined`).

**Example:**

```js
const value1 = 0 || 10;       // 10 (because 0 is falsy)
const value2 = 0 ?? 10;       // 0  (because 0 is NOT null or undefined)
```

---

## ✅ Common Use Case

It's commonly used when we want to provide a **default value**, but only if the variable is specifically `null` or`undefined`.

```js
function greet(name) {
    const userName = name ?? "Guest";
    console.log(`Hello, ${ userName } !`);
}

greet("Alice");   // Hello, Alice!
greet(null);      // Hello, Guest!
greet(undefined); // Hello, Guest!
```

---

we will use`??` when we **only** want to assign a default for `null` or`undefined`, and want to **preserve values like 0 or empty strings**.
