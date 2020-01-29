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
  id: number;
  name: string;
  color: string;
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
  let returnObj = [];
  returnObj = result?.payload?.results?.houses.map(house => {
    let newHouse = Object.assign({ sum: 0 }, house);
    newHouse.sum =
      house?.People.length > 0
        ? house?.People?.map(person => {
            let newPerson = Object.assign({ sum: 0 }, person);
            newPerson.sum =
              newPerson.Contributions.length > 0
                ? newPerson.Contributions.map(a =>
                    a.multiplier ? a.multiplier * a.Task.points : a.Task.points
                  ).reduce((a, b) => a + b)
                : 0;
            return newPerson.sum;
          }).reduce((a, b) => a + b)
        : 0;
    return newHouse;
  });

  // * Sort by sum so house at index 0 is the leading house
  return returnObj.sort((a, b) => (a.sum > b.sum ? a.sum : b.sum));
};

export default useHouses;
