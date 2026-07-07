export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'welcome' | 'freebet' | 'cashback' | 'referral' | 'reload';
  bonusAmount: number;
  minDeposit?: number;
  wageringRequirement: number;
  validUntil: string;
  terms: string[];
  isActive: boolean;
}

export const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Welcome Bonus',
    description: 'Get 100% bonus on your first deposit up to $500! Start your winning journey with double the action.',
    type: 'welcome',
    bonusAmount: 500,
    minDeposit: 20,
    wageringRequirement: 10,
    validUntil: '2025-03-31',
    terms: [
      'Minimum deposit of $20 required',
      '10x wagering requirement before withdrawal',
      'Valid for 30 days after activation',
      'Maximum bonus $500',
    ],
    isActive: true,
  },
  {
    id: '2',
    title: 'Free Bet Friday',
    description: 'Place a $50 bet on any Friday and get a $10 free bet! Use it on any sport or casino game.',
    type: 'freebet',
    bonusAmount: 10,
    minDeposit: 50,
    wageringRequirement: 1,
    validUntil: '2025-12-31',
    terms: [
      'Available every Friday',
      'Minimum qualifying bet $50',
      'Free bet must be used within 24 hours',
      'No wagering on free bet winnings',
    ],
    isActive: true,
  },
  {
    id: '3',
    title: 'Weekly Cashback',
    description: 'Get 10% cashback on your weekly losses up to $200. We\'ve got your back!',
    type: 'cashback',
    bonusAmount: 200,
    wageringRequirement: 1,
    validUntil: '2025-12-31',
    terms: [
      '10% cashback on net weekly losses',
      'Maximum cashback $200',
      'Credited every Monday',
      'No wagering requirement on cashback',
    ],
    isActive: true,
  },
  {
    id: '4',
    title: 'Refer a Friend',
    description: 'Invite friends and both get $25 bonus! Share the fun and win together.',
    type: 'referral',
    bonusAmount: 25,
    wageringRequirement: 5,
    validUntil: '2025-12-31',
    terms: [
      'Referral must make minimum $20 deposit',
      'Both parties receive $25 bonus',
      '5x wagering requirement',
      'Unlimited referrals allowed',
    ],
    isActive: true,
  },
  {
    id: '5',
    title: 'Weekend Reload',
    description: 'Boost your weekend with 50% reload bonus up to $100 on Saturday and Sunday deposits.',
    type: 'reload',
    bonusAmount: 100,
    minDeposit: 30,
    wageringRequirement: 8,
    validUntil: '2025-12-31',
    terms: [
      'Available Saturday and Sunday only',
      'Minimum deposit $30',
      'Maximum bonus $100',
      '8x wagering requirement',
    ],
    isActive: true,
  },
];
