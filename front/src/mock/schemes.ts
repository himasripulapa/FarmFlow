export interface GovtScheme {
  id: string;
  title: string;
  category: string;
  mspOrSubsidy: string;
  description: string;
  eligibility: string;
  link: string;
}

export const MOCK_GOVT_SCHEMES: GovtScheme[] = [
  {
    id: 'SCH-01',
    title: 'PM-KISAN Samman Nidhi',
    category: 'Direct Income Support',
    mspOrSubsidy: '₹6,000 / year in 3 equal installments',
    description: 'Financial benefit to all landholding farmer families across India to supplement crop health and yields.',
    eligibility: 'All small & marginal landholder farmers with verified Aadhaar bank link.',
    link: 'https://pmkisan.gov.in'
  },
  {
    id: 'SCH-02',
    title: 'Minimum Support Price (MSP) 2026 Season',
    category: 'Price Assurance',
    mspOrSubsidy: 'Paddy: ₹2,300/qtl | Groundnut: ₹6,780/qtl | Cotton: ₹7,121/qtl',
    description: 'Guaranteed government procurement price at state agricultural collection centers.',
    eligibility: 'Registered FarmFlow digital batch holders presenting verified quality certificate grade A/B.',
    link: 'https://agricoop.nic.in'
  },
  {
    id: 'SCH-03',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Crop Insurance',
    mspOrSubsidy: 'Premium: 1.5% for Rabi, 2.0% for Kharif crops',
    description: 'Comprehensive risk insurance against unseasonal rainfall, drought, and post-harvest losses.',
    eligibility: 'All farmers growing notified crops in notified areas.',
    link: 'https://pmfby.gov.in'
  },
  {
    id: 'SCH-04',
    title: 'Agri Infrastructure Fund (AIF)',
    category: 'Post-Harvest Infrastructure Loan',
    mspOrSubsidy: '3% Interest Subvention up to ₹2 Crore loan',
    description: 'Medium-long term debt financing facility for investment in viable post-harvest management & cold storage.',
    eligibility: 'FPOs, Agri-entrepreneurs, Collection Center Operators & Startups.',
    link: 'https://agriinfra.dac.gov.in'
  }
];
