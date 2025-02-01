import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Extend dayjs for timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

// Utility to convert dates to EST
const convertToEST = (date) => dayjs(date).tz("America/New_York").format();

//! Get the token
const token = getUserFromStorage();

//! Add Transaction API
export const addTransactionAPI = async ({
  type,
  category,
  date,
  description,
  amount,
}) => {
  const dateInEST = convertToEST(date); // Convert date to EST before sending

  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      category,
      date: dateInEST,
      description,
      amount,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

//! List Transactions API
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  const startDateInEST = startDate
    ? convertToEST(startDate)
    : undefined;
  const endDateInEST = endDate
    ? convertToEST(endDate)
    : undefined;

  const response = await axios.get(`${BASE_URL}/transactions/lists`, {
    params: { category, type, startDate: startDateInEST, endDate: endDateInEST },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
