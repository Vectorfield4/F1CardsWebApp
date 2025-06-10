import { InfoIcon } from "lucide-react";

export default function InfoCard() {
  return (
    <div style={{ margin: '24px', padding: '24px', borderRadius: '15px', backgroundColor: '#2B2D35', color: 'white' }}>
      <h3 style={{  marginTop: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <InfoIcon color="white" fontSize="small" />Информация о наборе</h3>

      <p> Набор «Королевы скорости» <b> бесплатно </b> 
        выдается раз в неделю: каждое воскресенье в 12:00 по московскому времени.
      </p>
      <p>
        Из одного пака может выпасть от двух до трех карточек в категориях:
        <strong> бронза, серебро, золото.</strong>
      </p>
    </div>
  )
}
