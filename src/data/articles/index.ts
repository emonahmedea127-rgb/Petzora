import { Article } from '../../types';
import { dogsArticle } from './dogs';
import { catsArticle } from './cats';
import { careArticle } from './care';
import { healthArticle } from './health';
import { nutritionArticle } from './nutrition';
import { trainingArticle } from './training';
import { behaviorArticle } from './behavior';
import { reviewsArticle } from './reviews';
import { storiesArticle } from './stories';
import { emergencyFirstAidArticle } from './emergency';

export const allPillarArticles: Article[] = [
  dogsArticle,
  catsArticle,
  careArticle,
  healthArticle,
  nutritionArticle,
  trainingArticle,
  behaviorArticle,
  reviewsArticle,
  storiesArticle,
  emergencyFirstAidArticle,
];
