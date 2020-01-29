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

interface Props {
  profile: Profile;
  houses: any;
}

const usePerson = (props: Props) => {
  const [person, setPerson] = useState<Service<BPType>>({
    status: "loading",
    payload: defaultResult
  });
  let result = person;

  useEffect(() => {
    fetch("/api/hacker/live/houseInfo")
      .then(res => res.json())
      .then(res => setPerson({ status: "loaded", payload: { results: res } }))
      .catch(err =>
        setPerson({ status: "error", payload: defaultResult, error: err })
      );
  }, []);

  let returnObj = result?.payload?.results?.houses.map(house => {
    let newHouse = Object.assign({ sum: 0 }, house);
    newHouse.sum =
      house?.People.length > 0
        ? house?.People?.map(person => {
            let newPerson = Object.assign({ sum: 0 }, person);
            newPerson.sum =
              newPerson?.Contributions.length > 0
                ? newPerson?.Contributions.map(a =>
                    a.multiplier ? a.multiplier * a.Task.points : a.Task.points
                  ).reduce((a, b) => a + b)
                : 0;
            return newPerson.sum;
          }).reduce((a, b) => a + b)
        : 0;
    return newHouse;
  });

  return returnObj.sort((a, b) => (a.sum > b.sum ? a.sum : b.sum));
};

export default usePerson;
