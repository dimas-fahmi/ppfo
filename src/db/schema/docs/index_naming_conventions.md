# Index Naming Convention Documentation

This document outlines the naming convention for indexes used in the database schema, specifically for the Drizzle ORM with PostgreSQL.

## Naming Pattern

Indexes follow a consistent and descriptive naming convention to clearly indicate their purpose, scope, and target column. The pattern is as follows:

- **Regular Index**: `IDX_[SCHEMA_NAME]_[TABLE_NAME]_[COLUMN_NAME]`
- **Unique Index**: `UIDX_[SCHEMA_NAME]_[TABLE_NAME]_[COLUMN_NAME]`

### Components

1. **Prefix**:

   - `IDX_` for regular indexes.
   - `UIDX_` for unique indexes.
   - The prefix distinguishes between standard and unique constraints.

2. **Schema Name**:

   - The schema name (e.g., `USER_MANAGEMENT`) is included to specify the schema the table belongs to.

3. **Table Name**:

   - The table name (e.g., `PROFILES`) is included to indicate the specific table the index applies to.

4. **Column Name**:

   - The column name (e.g., `FULL_NAME`, `DISPLAY_NAME`) is included to identify the column targeted by the index.

5. **Format**:
   - All parts are concatenated with underscores (`_`) and written in uppercase for consistency.

## Examples

### Example 1: Regular Index

- **Index Name**: `IDX_USER_MANAGEMENT_PROFILES_FULL_NAME`
- **Description**: A regular index on the `fullName` column of the `profiles` table in the `userManagement` schema.
- **Code**:
  ```javascript
  index("IDX_USER_MANAGEMENT_PROFILES_FULL_NAME").on(t.fullName);
  ```

### Example 2: Unique Index

- **Index Name**: `UIDX_USER_MANAGEMENT_PROFILES_DISPLAY_NAME`
- **Description**: A unique index on the `display_name` column of the `profiles` table in the `userManagement` schema.
- **Code**:
  ```javascript
  uniqueIndex("UIDX_USER_MANAGEMENT_PROFILES_DISPLAY_NAME").on(t.display_name);
  ```

## Guidelines

- **Consistency**: Always use uppercase for the index name components to maintain uniformity.
- **Clarity**: Ensure the schema, table, and column names are clearly reflected in the index name.
- **Uniqueness**: Use `UIDX_` for indexes that enforce unique constraints to differentiate them from regular indexes.
- **Separator**: Use underscores (`_`) to separate the components for readability.

## Purpose

This naming convention:

- Improves readability and maintainability of the database schema.
- Clearly indicates the schema, table, and column associated with each index.
- Distinguishes between regular and unique indexes for easier identification.
