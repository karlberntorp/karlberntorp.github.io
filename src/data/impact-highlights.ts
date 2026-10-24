export interface ImpactHighlight {
  id: string;
  heading: string;
  description: string;
}

export const impactHighlights: ImpactHighlight[] = [
  {
    id: 'fleet-routing',
    heading: 'Robot fleet routing in production',
    description: 'At Walmart Advanced Systems & Robotics, proposed and prototyped routing improvements for its automated pickup and delivery system and worked with software engineers to deploy them. Production results included 10% higher pick rates and a 30% reduction in long-tail dispense and product task times.',
  },
  {
    id: 'satellite-positioning',
    heading: 'Centimeter-level satellite positioning',
    description: 'At MERL, designed and implemented a satellite-positioning estimation algorithm in C. Experiments on customer data demonstrated less than 3 cm positioning error over 24 hours.',
  },
  {
    id: 'shipping-yard-autonomy',
    heading: 'Autonomous shipping-yard vehicles',
    description: 'At MERL, co-developed control architecture, particle-filter-based motion planning, and model-predictive control for automated tractor maneuvering in shipping yards, contributing to the development of a commercial customer system.',
  },
];
