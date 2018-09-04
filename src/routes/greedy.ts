import { IParsed } from "../parser";
import { toMatrixLDR } from "../misc/to-matrix";
import { range, getDistance } from "../misc/utils";

const getNextCity = ({
  dimension,
  matrix,
  lastCity,
  route
}: {
  matrix: number[][];
  route: number[];
  lastCity: number;
  dimension: number;
}) => {
  const arr = range(dimension)
    .map((_, index) => index + 1)
    .filter(x => route.indexOf(x) === -1)
    .map(index => ({
      index,
      distance: getDistance({ c1: index, c2: lastCity, ldrMatrix: matrix })
    }))
    .sort((a, b) => a.distance - b.distance);
  return arr[0];
};

export const oneHeadRoute = (parsed: IParsed) => {
  const { dimension } = parsed;
  const matrix = toMatrixLDR(parsed);
  let route = [1];

  for (let index = 0; index < dimension; index++) {
    const lastCity = route[route.length - 1];

    const nextCity = getNextCity({ matrix, route, dimension, lastCity });
    if (nextCity) {
      route.push(nextCity.index);
    } else {
      route.push(1);
    }
  }

  return route;
};

export const twoHeadRoute = (parsed: IParsed) => {
  const { dimension } = parsed;
  const matrix = toMatrixLDR(parsed);
  let route = [1];

  for (let index = 0; index < dimension; index++) {
    const lastCityHead1 = route[0];
    const lastCityHead2 = route[route.length - 1];

    const nextCityHead1 = getNextCity({
      matrix,
      route,
      dimension,
      lastCity: lastCityHead1
    });
    const nextCityHead2 = getNextCity({
      matrix,
      route,
      dimension,
      lastCity: lastCityHead2
    });

    if (!nextCityHead1 && !nextCityHead2) {
      // último item da iteração
      route.push(lastCityHead1);
    } else if (nextCityHead1.distance < nextCityHead2.distance) {
      // adiciona na frente do array
      route = [nextCityHead1.index, ...route];
    } else {
      // adiciona no fim do array
      route.push(nextCityHead2.index);
    }
  }

  return route;
};
