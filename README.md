# credit-roles

[![credit-roles on npm](https://img.shields.io/npm/v/credit-roles.svg)](https://www.npmjs.com/package/credit-roles)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/curvenote/credit-roles/blob/main/LICENSE)
![CI](https://github.com/curvenote/credit-roles/workflows/CI/badge.svg)

> CRediT (Contributor Roles Taxonomy) is a high-level taxonomy, including 14 roles, that can be used to represent the roles typically played by contributors to research outputs. The roles describe each contributor’s specific contribution to the scholarly output. (https://credit.niso.org/)

A utility for validating [CRT Contributor Roles](https://credit.niso.org/) in your application, building canonical URLs, and showing descriptions.

```shell
npm install credit-roles
```

The library has **no dependencies**, and is helpful in validating, normalizing and showing descriptions of CRediT roles.

## Overview & Usage

```ts
import credit, { CreditRole, CreditDescriptions } from 'credit-roles';

// Validate that a string is a role
credit.validate('contributor'); // true

// Handles British spelling and capitalizations
credit.normalize('conceptualiSation'); // "Conceptualization"

// Handles different punctuation
credit.normalize('writing:  original draft'); // "Writing – original draft"

// Show the descriptions in your application
CreditDescriptions['Supervision']; // Oversight and leadership responsibility...

// An enum for easy access to the roles
CreditRole.WritingOriginalDraft;
```

## Included Utilities

- `validate` - Validates if a string to a CRediT role if it is valid, will take URLs and unformatted strings
- `normalize` - Normalizes a CRediT string into the canonical string (including hyphens, capitalization and punctuation)
- `buildUrl` - Builds a URL to https://credit.niso.org, includes normalization
- `CreditRole` - an enum of the CRediT roles
- `CreditDescriptions` - Official descriptions of the CRediT roles by NISO

## Options

- `strict`: only accept normalized CRediT roles when validating or building URLs

## References

- https://credit.niso.org/
- https://jats4r.org/credit-taxonomy

---

<p style="text-align: center; color: #aaa; padding-top: 50px">
  Made with love by
  <a href="https://curvenote.com" target="_blank" style="color: #aaa">
    <img src="https://curvenote.dev/images/icon.png" style="height: 1em" /> Curvenote
  </a>
</p>
