import { describe, expect, test } from 'vitest';
import { credit } from '../src';

describe('Credit Roles', () => {
  test.each([
    ['Conceptualization', 'https://credit.niso.org/contributor-roles/conceptualization/'],
    ['Data curation', 'https://credit.niso.org/contributor-roles/data-curation/'],
    ['Formal analysis', 'https://credit.niso.org/contributor-roles/formal-analysis/'],
    ['Funding acquisition', 'https://credit.niso.org/contributor-roles/funding-acquisition/'],
    ['Investigation', 'https://credit.niso.org/contributor-roles/investigation/'],
    ['Methodology', 'https://credit.niso.org/contributor-roles/methodology/'],
    ['Project administration', 'https://credit.niso.org/contributor-roles/project-administration/'],
    ['Resources', 'https://credit.niso.org/contributor-roles/resources/'],
    ['Software', 'https://credit.niso.org/contributor-roles/software/'],
    ['Supervision', 'https://credit.niso.org/contributor-roles/supervision/'],
    ['Validation', 'https://credit.niso.org/contributor-roles/validation/'],
    ['Visualization', 'https://credit.niso.org/contributor-roles/visualization/'],
    [
      'Writing – original draft',
      'https://credit.niso.org/contributor-roles/writing-original-draft/',
    ],
    [
      'Writing – review & editing',
      'https://credit.niso.org/contributor-roles/writing-review-editing/',
    ],
  ])('buildUrl for %s', (role, url) => {
    expect(credit.buildUrl(role)).toBe(url);
  });
  test.each([
    ['nope', undefined],
    ['  conceptualiZation', 'Conceptualization'],
    ['conceptualiSation', 'Conceptualization'], // English spelling
    ['writing original draft', 'Writing – original draft'],
    ['writing - original draft', 'Writing – original draft'],
    ['writing: original draft', 'Writing – original draft'],
  ])('normalize and validate for %s', (str, role) => {
    expect(credit.validate(str)).toBe(!!role);
    if (role) expect(credit.normalize(str)).toBe(role);
  });
});
