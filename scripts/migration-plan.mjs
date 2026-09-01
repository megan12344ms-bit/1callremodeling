/**
 * Migration file detection and planning.
 * Scans migration directory and determines which migrations need to run.
 */

const MIGRATION_FILE_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\w+\.sql$/;

/**
 * Checks if a filename matches the migration file naming convention.
 * Expected format: YYYY-MM-DDTHH-MM-SS-<description>.sql
 */
export function isMigrationFile(filename) {
  return MIGRATION_FILE_PATTERN.test(filename);
}

/**
 * Extracts timestamp from migration filename.
 * Returns timestamp for sorting migrations chronologically.
 */
export function getMigrationTimestamp(filename) {
  if (!isMigrationFile(filename)) return null;
  
  const match = filename.match(/^(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2})/);
  return match ? match[1].replace('T', ' ').replace(/-/g, ':') : null;
}

/**
 * Sorts migration files chronologically.
 */
export function sortMigrations(files) {
  return files
    .filter(isMigrationFile)
    .sort((a, b) => {
      const timeA = getMigrationTimestamp(a);
      const timeB = getMigrationTimestamp(b);
      return (timeA || '').localeCompare(timeB || '');
    });
}
