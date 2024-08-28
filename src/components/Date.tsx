import { format, isSameDay, subDays } from 'date-fns';
import clock from "../assets/clock.svg";
import clockRed from "../assets/clockRed.svg";
import clockYellow from "../assets/clockYellow.svg";

const DateComponent = ({ date }: { date: string }) => {
  const utcDate = new Date(date);

  const today = new Date();
  const daysUntilDue = Math.ceil((utcDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const yesterday = subDays(new Date(), 1);
  const isToday = isSameDay(utcDate, new Date());
  const isYesterday = isSameDay(utcDate, yesterday);
  const formattedDate = format(utcDate, 'dd MMMM, yyyy');

  let textColor = 'white';
  let backgroundColor = '[#36393d]';
  let icon = clock;
  if (daysUntilDue < 0) {
    textColor = 'textRed';
    backgroundColor = 'bgRed';
    icon = clockRed;
  } else if (daysUntilDue <= 2) {
    textColor = 'textYellow';
    backgroundColor = "bgYellow"
    icon = clockYellow;
  }

  return (
    <div className={`flex justify-center p-2 bg-${backgroundColor} rounded gap-2 text-white`}>
      <img src={icon} width={20}/>
      <span className={`text-${textColor}`}>
        {isToday ? 'Today' : isYesterday ? 'Yesterday' : formattedDate}
      </span>
    </div>
  );
};

export default DateComponent;