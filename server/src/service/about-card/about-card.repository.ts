import { AboutCard } from '../../models/about-card';

export abstract class AboutCardRepository {
    abstract getAboutCards(): Promise<AboutCard[]>;
}
