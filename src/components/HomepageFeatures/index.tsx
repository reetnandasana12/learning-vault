import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'SQL',
    emoji: '🗄️',
    description: (
      <>
        Complete SQL notes covering databases, tables, CRUD operations,
        joins, subqueries, aggregate functions, window functions, and more.
      </>
    ),
    link: '/docs/sql/introduction',
  },
  {
    title: 'DSA',
    emoji: '🧠',
    description: (
      <>
        Data Structures & Algorithms with C++ and Java examples — arrays,
        trees, graphs, dynamic programming, and pattern recognition guide.
      </>
    ),
    link: '/docs/dsa/dsa-introduction',
  },
];

function Feature({title, emoji, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--md">
        <div style={{fontSize: '3rem'}}>{emoji}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className="button button--primary button--sm" to={link}>
          Start Learning →
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{justifyContent: 'center'}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
