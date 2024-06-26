import { getPaymentLink } from "../../api/plan";

export default function PlanCard({ planId, name, description, price, period, waitingResponseState }) {
    const years = period[12] === '1' && "Año";
    const months = period[8] === '1' && "Mes";
    const weeks = period[4] === '1' && "Semana";
    const days = period[0] === '1' && "Día";
    const duration = years ? years : months ? months : weeks ? weeks : days;

    const goToPaymentLink = async () => {
        waitingResponseState(true);

        getPaymentLink(planId)
        .then(res => {
            window.location.href = res.data.payment_link;
        })
    };

    return (
        <div className='text-white border-b-4 border-b-button p-10 z-[100] shadow-2xl shadow-indigo-500/60 bg-primary rounded-md cursor-pointer max-w-[18rem] min-w-[18rem]'>
            <h1 className='text-title font-bold text-2xl'>{name}</h1>
            <p className="mb-5">{description}</p>
            <p className='text-lg'>${price} USD</p>
            <p className='border-t-2 border-t-paragraph'>{duration}</p>
            <button onClick={goToPaymentLink} className='bg-button text-black p-3 rounded-md mt-5 hover:bg-button-hover'>Adquirir plan</button>
        </div>
    )
}
