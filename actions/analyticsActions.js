import { Analytics, PageHit, Event } from 'expo-analytics';
export const analytics = new Analytics('UA-692595-12');

export function screenHitCall(name) {
    analytics.hit(new PageHit(name))
      .then(() => console.log(name + " success"))
      .catch(e => console.log(e.message));
}

export function productEvent(id) {
    analytics.event(new Event('Product', id))
        .then(() => console.log("product success ", id))
        .catch(e => console.log(e.message))
}