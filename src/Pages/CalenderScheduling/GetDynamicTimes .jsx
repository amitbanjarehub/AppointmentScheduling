import moment from "moment";

export const GetDynamicTimes = (currentDate, workingTime1) => {
  const currentDay = moment(currentDate).day(); // Get current day of the week (0 - Sunday, 6 - Saturday)

  const dayConfig = workingTime1.find((config) => config.day === currentDay);

  if (dayConfig) {
    return {
      min: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        dayConfig.min,
        0
      ),
      max: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        dayConfig.max,
        0
      ),
      step: dayConfig.step,
      timeslots: dayConfig.timeslots,
    };
  }
  return {
    min: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      9,
      0
    ),
    max: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      17,
      0
    ),
    step: 30,
    timeslots: 1,
  };
};
