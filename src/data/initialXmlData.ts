export const INITIAL_FITCOACH_XML = `<?xml version="1.0" encoding="UTF-8"?>
<fitcoach_database version="1.0" exported_at="2026-03-01T12:00:00Z">
  <brand>
    <brand_name>Fitia Coach Pro</brand_name>
    <coach_name>Coach Viviana Ocampo</coach_name>
    <coach_title>Especialista en Nutrición &amp; Hipertrofia</coach_title>
    <subdomain>viviana.fitiacoach.fit</subdomain>
    <primary_color>#84cc16</primary_color>
    <accent_color>#22c55e</accent_color>
    <logo_icon>flame</logo_icon>
    <support_email>coach@fitiacoach.fit</support_email>
    <currency>USD</currency>
  </brand>

  <routines>
    <routine id="rt-1" title="Hipertrofia Push-Pull-Legs" days="5" level="intermediate" focus="Ganancia muscular">
      <exercises>
        <exercise id="ex-1" name="Press Banca Plano con Barra" sets="4" reps="8-10" rest="90" notes="Pausa de 1s en el pecho" />
        <exercise id="ex-2" name="Sentadilla Trasera con Barra" sets="4" reps="6-8" rest="120" notes="Profundidad paralela estricta" />
        <exercise id="ex-3" name="Remo con Barra Pendlay" sets="4" reps="10" rest="90" notes="Espalda neutra" />
        <exercise id="ex-4" name="Elevaciones Laterales con Mancuerna" sets="4" reps="12-15" rest="60" notes="Control excéntrico" />
      </exercises>
    </routine>

    <routine id="rt-2" title="Definición &amp; Metabólico Funcional" days="4" level="intermediate" focus="Pérdida de grasa y condición">
      <exercises>
        <exercise id="ex-5" name="Kettlebell Swings Pesados" sets="5" reps="15" rest="45" notes="Empuje explosivo de cadera" />
        <exercise id="ex-6" name="Thrusters con Mancuernas" sets="4" reps="10" rest="60" notes="Fluidez constante" />
        <exercise id="ex-7" name="Dominadas con Asistencia / Libres" sets="4" reps="8" rest="75" notes="Rango completo" />
        <exercise id="ex-8" name="Plancha Abdominal con Toque de Hombro" sets="3" reps="20" rest="45" notes="Core activo" />
      </exercises>
    </routine>

    <routine id="rt-3" title="Fuerza Básica &amp; Readaptación" days="3" level="beginner" focus="Postura y fuerza base">
      <exercises>
        <exercise id="ex-9" name="Peso Muerto Rumano con Mancuernas" sets="3" reps="10-12" rest="90" notes="Sentir estiramiento en isquios" />
        <exercise id="ex-10" name="Press Militar con Mancuernas Sentado" sets="3" reps="10" rest="75" notes="Sin hiperextender lumbar" />
        <exercise id="ex-11" name="Goblet Squat con Kettlebell" sets="3" reps="12" rest="75" notes="Pies al ancho de hombros" />
      </exercises>
    </routine>
  </routines>

  <clients>
    <client id="cli-1" status="active" goal="hypertrophy" payment_status="paid" routine_id="rt-1">
      <personal>
        <full_name>Mateo Henao</full_name>
        <email>mateo.henao@corp.com</email>
        <phone>+57 312 456 7890</phone>
        <age>28</age>
        <gender>M</gender>
        <joined_date>2026-01-15</joined_date>
        <monthly_fee>120</monthly_fee>
      </personal>
      <nutrition calories="2850" protein="185" carbs="340" fats="75" water="3.5" />
      <records>
        <record date="2026-01-15" weight="74.5" body_fat="18.2" muscle="35.0" />
        <record date="2026-02-15" weight="76.2" body_fat="16.8" muscle="36.4" />
      </records>
      <daily_plan date="2026-03-01">
        <water_intake glasses="8" target="14" />
        <meal type="breakfast" name="Desayuno Energético" target_kcal="650">
          <food id="f-7" name="Avena en Hojuelas Integral" category="carb" grams="70" kcal="272" protein="11.8" carbs="46.4" fats="4.8" checked="true" />
          <food id="f-3" name="Proteína Whey Isolate" category="protein" grams="35" kcal="130" protein="30.1" carbs="0.9" fats="0.4" checked="true" />
          <food id="f-16" name="Plátano / Banano Maduro" category="fruit" grams="120" kcal="107" protein="1.3" carbs="27.4" fats="0.4" checked="true" />
          <food id="f-15" name="Mantequilla de Maní Natural" category="fat" grams="20" kcal="118" protein="5.0" carbs="4.0" fats="10.0" checked="true" />
        </meal>
        <meal type="lunch" name="Almuerzo Principal" target_kcal="950">
          <food id="f-1" name="Pechuga de Pollo a la Plancha" category="protein" grams="200" kcal="330" protein="62.0" carbs="0" fats="7.2" checked="true" />
          <food id="f-8" name="Arroz Blanco Cocido" category="carb" grams="250" kcal="325" protein="6.8" carbs="70.5" fats="0.8" checked="true" />
          <food id="f-12" name="Aguacate Hass" category="fat" grams="80" kcal="128" protein="1.6" carbs="6.8" fats="11.8" checked="true" />
          <food id="f-18" name="Brócoli al Vapor" category="vegetable" grams="150" kcal="53" protein="3.6" carbs="10.8" fats="0.6" checked="true" />
        </meal>
        <meal type="snack" name="Merienda / Pre-Entreno" target_kcal="450">
          <food id="f-20" name="Yogurt Griego Natural 0% Grasa" category="dairy" grams="200" kcal="118" protein="20.0" carbs="7.2" fats="0.8" checked="true" />
          <food id="f-17" name="Fresas Frescas" category="fruit" grams="150" kcal="48" protein="1.1" carbs="11.6" fats="0.5" checked="false" />
          <food id="f-14" name="Almendras Naturales Tostadas" category="fat" grams="25" kcal="145" protein="5.3" carbs="5.4" fats="12.5" checked="true" />
        </meal>
        <meal type="dinner" name="Cena de Recuperación" target_kcal="800">
          <food id="f-6" name="Carne Magra de Res Molida (90/10)" category="protein" grams="180" kcal="317" protein="46.8" carbs="0" fats="14.4" checked="false" />
          <food id="f-9" name="Batata / Camote al Horno" category="carb" grams="200" kcal="172" protein="3.2" carbs="40.2" fats="0.2" checked="false" />
          <food id="f-19" name="Espinacas Frescas Baby" category="vegetable" grams="100" kcal="23" protein="2.9" carbs="3.6" fats="0.4" checked="false" />
          <food id="f-13" name="Aceite de Oliva Extra Virgen" category="fat" grams="12" kcal="106" protein="0" carbs="0" fats="12.0" checked="false" />
        </meal>
      </daily_plan>
    </client>

    <client id="cli-2" status="active" goal="fat_loss" payment_status="paid" routine_id="rt-2">
      <personal>
        <full_name>Camila Valencia</full_name>
        <email>camila.valencia@gmail.com</email>
        <phone>+57 320 890 1234</phone>
        <age>31</age>
        <gender>F</gender>
        <joined_date>2025-11-10</joined_date>
        <monthly_fee>140</monthly_fee>
      </personal>
      <nutrition calories="1750" protein="140" carbs="155" fats="50" water="3.0" />
      <records>
        <record date="2025-11-10" weight="68.0" body_fat="29.5" muscle="24.2" />
        <record date="2026-01-20" weight="64.8" body_fat="25.8" muscle="24.9" />
        <record date="2026-02-25" weight="63.2" body_fat="24.1" muscle="25.3" />
      </records>
      <daily_plan date="2026-03-01">
        <water_intake glasses="7" target="12" />
        <meal type="breakfast" name="Desayuno Proteico" target_kcal="420">
          <food id="f-2" name="Huevos Enteros Cocidos" category="protein" grams="120" kcal="172" protein="15.1" carbs="0.8" fats="11.4" checked="true" />
          <food id="f-11" name="Pan Integral de Grano Entero" category="carb" grams="60" kcal="148" protein="7.8" carbs="24.8" fats="2.0" checked="true" />
          <food id="f-17" name="Fresas Frescas" category="fruit" grams="100" kcal="32" protein="0.7" carbs="7.7" fats="0.3" checked="true" />
        </meal>
        <meal type="lunch" name="Almuerzo Definición" target_kcal="580">
          <food id="f-1" name="Pechuga de Pollo a la Plancha" category="protein" grams="160" kcal="264" protein="49.6" carbs="0" fats="5.8" checked="true" />
          <food id="f-8" name="Arroz Blanco Cocido" category="carb" grams="120" kcal="156" protein="3.2" carbs="33.8" fats="0.4" checked="true" />
          <food id="f-18" name="Brócoli al Vapor" category="vegetable" grams="150" kcal="53" protein="3.6" carbs="10.8" fats="0.6" checked="true" />
          <food id="f-12" name="Aguacate Hass" category="fat" grams="40" kcal="64" protein="0.8" carbs="3.4" fats="5.9" checked="true" />
        </meal>
        <meal type="snack" name="Snack Saciedad" target_kcal="260">
          <food id="f-20" name="Yogurt Griego 0% Grasa" category="dairy" grams="170" kcal="100" protein="17.0" carbs="6.1" fats="0.7" checked="false" />
          <food id="f-14" name="Almendras Naturales Tostadas" category="fat" grams="15" kcal="87" protein="3.2" carbs="3.2" fats="7.5" checked="false" />
        </meal>
        <meal type="dinner" name="Cena Ligera Fitia" target_kcal="490">
          <food id="f-4" name="Lomo de Salmón al Horno" category="protein" grams="150" kcal="312" protein="33.0" carbs="0" fats="19.5" checked="false" />
          <food id="f-19" name="Espinacas Baby" category="vegetable" grams="120" kcal="28" protein="3.5" carbs="4.3" fats="0.5" checked="false" />
        </meal>
      </daily_plan>
    </client>

    <client id="cli-3" status="active" goal="strength" payment_status="pending" routine_id="rt-1">
      <personal>
        <full_name>Carlos Eduardo Duque</full_name>
        <email>carlos.duque@techlatam.io</email>
        <phone>+57 301 777 5544</phone>
        <age>35</age>
        <gender>M</gender>
        <joined_date>2026-02-01</joined_date>
        <monthly_fee>150</monthly_fee>
      </personal>
      <nutrition calories="3100" protein="205" carbs="380" fats="85" water="4.0" />
      <records>
        <record date="2026-02-01" weight="88.0" body_fat="21.5" muscle="41.2" />
        <record date="2026-02-28" weight="87.4" body_fat="20.3" muscle="42.0" />
      </records>
      <daily_plan date="2026-03-01">
        <water_intake glasses="5" target="16" />
        <meal type="breakfast" name="Desayuno Fuerza" target_kcal="700">
          <food id="f-2" name="Huevos Enteros Revueltos" category="protein" grams="150" kcal="215" protein="18.9" carbs="1.1" fats="14.3" checked="true" />
          <food id="f-7" name="Avena en Hojuelas" category="carb" grams="80" kcal="311" protein="13.5" carbs="53.0" fats="5.5" checked="true" />
          <food id="f-16" name="Plátano Maduro" category="fruit" grams="120" kcal="107" protein="1.3" carbs="27.4" fats="0.4" checked="true" />
        </meal>
        <meal type="lunch" name="Almuerzo de Carga" target_kcal="1000">
          <food id="f-6" name="Carne Magra de Res Molida" category="protein" grams="220" kcal="387" protein="57.2" carbs="0" fats="17.6" checked="true" />
          <food id="f-8" name="Arroz Blanco Cocido" category="carb" grams="300" kcal="390" protein="8.1" carbs="84.6" fats="0.9" checked="true" />
          <food id="f-12" name="Aguacate Hass" category="fat" grams="90" kcal="144" protein="1.8" carbs="7.7" fats="13.2" checked="true" />
        </meal>
        <meal type="snack" name="Batido Post-Entreno" target_kcal="400">
          <food id="f-3" name="Proteína Whey Isolate" category="protein" grams="40" kcal="148" protein="34.4" carbs="1.0" fats="0.5" checked="false" />
          <food id="f-15" name="Mantequilla de Maní" category="fat" grams="30" kcal="176" protein="7.5" carbs="6.0" fats="15.0" checked="false" />
        </meal>
        <meal type="dinner" name="Cena Completa" target_kcal="900">
          <food id="f-1" name="Pechuga de Pollo" category="protein" grams="200" kcal="330" protein="62.0" carbs="0" fats="7.2" checked="false" />
          <food id="f-9" name="Batata / Camote al Horno" category="carb" grams="250" kcal="215" protein="4.0" carbs="50.3" fats="0.3" checked="false" />
          <food id="f-13" name="Aceite de Oliva" category="fat" grams="15" kcal="133" protein="0" carbs="0" fats="15.0" checked="false" />
        </meal>
      </daily_plan>
    </client>

    <client id="cli-4" status="paused" goal="rehab" payment_status="overdue" routine_id="rt-3">
      <personal>
        <full_name>Juliana Sarmiento</full_name>
        <email>juliana.sarmiento@outlook.com</email>
        <phone>+57 315 222 9988</phone>
        <age>42</age>
        <gender>F</gender>
        <joined_date>2025-12-05</joined_date>
        <monthly_fee>110</monthly_fee>
      </personal>
      <nutrition calories="1900" protein="125" carbs="210" fats="55" water="2.5" />
      <records>
        <record date="2025-12-05" weight="62.5" body_fat="27.0" muscle="22.1" />
        <record date="2026-01-10" weight="61.8" body_fat="26.2" muscle="22.4" />
      </records>
      <daily_plan date="2026-03-01">
        <water_intake glasses="4" target="10" />
        <meal type="breakfast" name="Desayuno Balanceado" target_kcal="450">
          <food id="f-2" name="Huevos Enteros" category="protein" grams="100" kcal="143" protein="12.6" carbs="0.7" fats="9.5" checked="true" />
          <food id="f-11" name="Pan Integral" category="carb" grams="60" kcal="148" protein="7.8" carbs="24.8" fats="2.0" checked="true" />
        </meal>
        <meal type="lunch" name="Almuerzo Saludable" target_kcal="650">
          <food id="f-1" name="Pechuga de Pollo" category="protein" grams="150" kcal="248" protein="46.5" carbs="0" fats="5.4" checked="true" />
          <food id="f-8" name="Arroz Blanco Cocido" category="carb" grams="150" kcal="195" protein="4.1" carbs="42.3" fats="0.5" checked="true" />
        </meal>
        <meal type="snack" name="Merienda Ligera" target_kcal="250">
          <food id="f-17" name="Fresas Frescas" category="fruit" grams="150" kcal="48" protein="1.1" carbs="11.6" fats="0.5" checked="false" />
        </meal>
        <meal type="dinner" name="Cena Reconfortante" target_kcal="550">
          <food id="f-5" name="Atún en Agua" category="protein" grams="120" kcal="139" protein="31.2" carbs="0" fats="1.2" checked="false" />
        </meal>
      </daily_plan>
    </client>

    <client id="cli-5" status="active" goal="hypertrophy" payment_status="paid" routine_id="rt-1">
      <personal>
        <full_name>Santiago Morales</full_name>
        <email>santi.morales@fintech.co</email>
        <phone>+57 318 666 3322</phone>
        <age>24</age>
        <gender>M</gender>
        <joined_date>2026-02-14</joined_date>
        <monthly_fee>130</monthly_fee>
      </personal>
      <nutrition calories="2950" protein="190" carbs="360" fats="78" water="3.8" />
      <records>
        <record date="2026-02-14" weight="71.0" body_fat="15.2" muscle="36.0" />
      </records>
      <daily_plan date="2026-03-01">
        <water_intake glasses="9" target="15" />
        <meal type="breakfast" name="Desayuno Potente" target_kcal="700">
          <food id="f-7" name="Avena en Hojuelas" category="carb" grams="80" kcal="311" protein="13.5" carbs="53.0" fats="5.5" checked="true" />
          <food id="f-3" name="Proteína Whey Isolate" category="protein" grams="30" kcal="111" protein="25.8" carbs="0.8" fats="0.4" checked="true" />
        </meal>
        <meal type="lunch" name="Almuerzo Completo" target_kcal="950">
          <food id="f-1" name="Pechuga de Pollo" category="protein" grams="200" kcal="330" protein="62.0" carbs="0" fats="7.2" checked="true" />
          <food id="f-8" name="Arroz Blanco" category="carb" grams="250" kcal="325" protein="6.8" carbs="70.5" fats="0.8" checked="true" />
        </meal>
        <meal type="snack" name="Merienda" target_kcal="450">
          <food id="f-20" name="Yogurt Griego" category="dairy" grams="200" kcal="118" protein="20.0" carbs="7.2" fats="0.8" checked="true" />
        </meal>
        <meal type="dinner" name="Cena" target_kcal="850">
          <food id="f-6" name="Carne Magra de Res" category="protein" grams="180" kcal="317" protein="46.8" carbs="0" fats="14.4" checked="false" />
        </meal>
      </daily_plan>
    </client>
  </clients>
</fitcoach_database>`;
