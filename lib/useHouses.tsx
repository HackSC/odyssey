import { useEffect, useState } from "react";
import { Service } from "../types/Service";

export interface Contribs {
  multiplier: number;
  Task: {
    points: number;
  };
}
export interface Person {
  Contributions: Array<Contribs>;
}
export interface House {
  People: Array<Person>;
}
export interface BPType {
  results: {
    houses: Array<House>;
  };
}

const defaultResult = {
  results: {
    houses: []
  }
};

const useHouses = (req: any) => {
  const [houses, setHouses] = useState<Service<BPType>>({
    status: "loading",
    payload: defaultResult
  });
  let result = houses;

  useEffect(() => {
    fetch("/api/hacker/live/houseInfo")
      .then(res => res.json())
      .then(res => setHouses({ status: "loaded", payload: { results: res } }))
      .catch(err =>
        setHouses({ status: "error", payload: defaultResult, error: err })
      );
  }, []);

  // * Return array of houses with sum field
  return result?.payload?.results?.houses.map(house => {
    let newHouse = Object.assign({ sum: 0 }, house);
    newHouse.sum = house?.People?.map(person => {
      let newPerson = Object.assign({ sum: 0 }, person);
      newPerson.sum = newPerson?.Contributions.map(a =>
        a.multiplier ? a.multiplier * a.Task.points : a.Task.points
      ).reduce((a, b) => a + b);
      return newPerson.sum;
    }).reduce((a, b) => a + b);
    return newHouse;
  });
};

export default useHouses;
