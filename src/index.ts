export const CREDIT_URL = 'https://credit.niso.org/';

export type Options = {
  strict?: boolean;
};

/**
 * enum of the CRediT roles (https://credit.niso.org)
 */
export enum CreditRole {
  Conceptualization = 'Conceptualization',
  DataCuration = 'Data curation',
  FormalAnalysis = 'Formal analysis',
  FundingAcquisition = 'Funding acquisition',
  Investigation = 'Investigation',
  Methodology = 'Methodology',
  ProjectAdministration = 'Project administration',
  Resources = 'Resources',
  Software = 'Software',
  Supervision = 'Supervision',
  Validation = 'Validation',
  Visualization = 'Visualization',
  WritingOriginalDraft = 'Writing – original draft', // U+2013 hyphen is used in CRT spec
  WritingReviewEditing = 'Writing – review & editing',
}

/**
 * Descriptions of the CRediT roles (https://credit.niso.org)
 */
export const CreditDescriptions: Record<CreditRole, string> = {
  [CreditRole.Conceptualization]:
    'Ideas; formulation or evolution of overarching research goals and aims.',
  [CreditRole.DataCuration]:
    'Management activities to annotate (produce metadata), scrub data and maintain research data (including software code, where it is necessary for interpreting the data itself) for initial use and later re-use.',
  [CreditRole.FormalAnalysis]:
    'Application of statistical, mathematical, computational, or other formal techniques to analyse or synthesize study data.',
  [CreditRole.FundingAcquisition]:
    'Acquisition of the financial support for the project leading to this publication.',
  [CreditRole.Investigation]:
    'Conducting a research and investigation process, specifically performing the experiments, or data/evidence collection.',
  [CreditRole.Methodology]: 'Development or design of methodology; creation of models.',
  [CreditRole.ProjectAdministration]:
    'Management and coordination responsibility for the research activity planning and execution.',
  [CreditRole.Resources]:
    'Provision of study materials, reagents, materials, patients, laboratory samples, animals, instrumentation, computing resources, or other analysis tools.',
  [CreditRole.Software]:
    'Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms; testing of existing code components.',
  [CreditRole.Supervision]:
    'Oversight and leadership responsibility for the research activity planning and execution, including mentorship external to the core team.',
  [CreditRole.Validation]:
    'Verification, whether as a part of the activity or separate, of the overall replication/reproducibility of results/experiments and other research outputs.',
  [CreditRole.Visualization]:
    'Preparation, creation and/or presentation of the published work, specifically visualization/data presentation.',
  [CreditRole.WritingOriginalDraft]:
    'Preparation, creation and/or presentation of the published work, specifically writing the initial draft (including substantive translation).',
  [CreditRole.WritingReviewEditing]:
    'Preparation, creation and/or presentation of the published work by those from the original research group, specifically critical review, commentary or revision – including pre- or post-publication stages.',
};

/**
 * CRediT roles as a list of strings
 */
export const ROLES = Object.keys(CreditDescriptions) as CreditRole[]; // enums are not easy to index

/**
 * Standardize various strings to a common string with british spelling, not for external use.
 */
function standardize(v: CreditRole | string): string {
  return v
    .trim()
    .toLowerCase()
    .replaceAll('z', 's') // This accounts for british spelling ...
    .split('')
    .reduce((s, n) => {
      if (n.match(/([a-z])/)) return [...s, n];
      const last = s[s.length - 1];
      if (!last?.match(/([a-z])/)) return s;
      return [...s, '-'];
    }, [] as string[])
    .join('');
}

const STANDARDIZED_ROLES: Record<string, CreditRole> = Object.fromEntries(
  ROLES.map((v) => [standardize(v), v]),
);

function normalize(value?: CreditRole | string | null, opts?: Options): CreditRole | undefined {
  if (!value) return undefined;
  if (ROLES.includes(value as CreditRole)) return value as CreditRole;
  if (opts?.strict) return undefined;
  return STANDARDIZED_ROLES[standardize(value)] ?? undefined;
}

/**
 * Validate that the input string is a valid CRediT role.
 *
 * @param value
 * @returns true if CRediT role is valid
 */
function validate(value?: CreditRole | string | null, opts?: Options): boolean {
  if (!value) return false;
  return !!normalize(value, opts);
}

/**
 * Builds a canonical URL pointing to https://credit.niso.org/
 *
 * @param value
 * @returns the CRediT role as a string
 */
function buildUrl(value?: CreditRole | string | null, opts?: Options): string | undefined {
  const role = normalize(value, opts);
  if (!role) return undefined;
  const url = role.toLowerCase().replace('– ', '').replace('& ', '').replaceAll(' ', '-');
  return `${CREDIT_URL}contributor-roles/${url}/`;
}

const credit = {
  validate,
  normalize,
  buildUrl,
};

export default credit;
