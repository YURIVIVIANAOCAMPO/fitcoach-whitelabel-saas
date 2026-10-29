export const INITIAL_FITCOACH_XML = `<?xml version="1.0" encoding="UTF-8"?>
<fitcoach_database version="1.0" exported_at="2026-03-01T12:00:00Z">
  <brand>
    <brand_name>Apex Coach Studio</brand_name>
    <coach_name>Coach Viviana Ocampo</coach_name>
    <coach_title>Especialista en Hipertrofia &amp; Rendimiento</coach_title>
    <subdomain>viviana.apexcoach.fit</subdomain>
    <primary_color>#84cc16</primary_color>
    <accent_color>#22c55e</accent_color>
    <logo_icon>flame</logo_icon>
    <support_email>coach@apexcoach.fit</support_email>
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
      <nutrition calories="2850" protein="180" carbs="340" fats="75" water="3.5" />
      <records>
        <record date="2026-01-15" weight="74.5" body_fat="18.2" muscle="35.0" />
        <record date="2026-02-15" weight="76.2" body_fat="16.8" muscle="36.4" />
      </records>
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
      <nutrition calories="1750" protein="135" carbs="160" fats="52" water="2.8" />
      <records>
        <record date="2025-11-10" weight="68.0" body_fat="29.5" muscle="24.2" />
        <record date="2026-01-20" weight="64.8" body_fat="25.8" muscle="24.9" />
        <record date="2026-02-25" weight="63.2" body_fat="24.1" muscle="25.3" />
      </records>
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
      <nutrition calories="3100" protein="200" carbs="380" fats="85" water="4.0" />
      <records>
        <record date="2026-02-01" weight="88.0" body_fat="21.5" muscle="41.2" />
        <record date="2026-02-28" weight="87.4" body_fat="20.3" muscle="42.0" />
      </records>
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
      <nutrition calories="1900" protein="120" carbs="210" fats="55" water="2.5" />
      <records>
        <record date="2025-12-05" weight="62.5" body_fat="27.0" muscle="22.1" />
        <record date="2026-01-10" weight="61.8" body_fat="26.2" muscle="22.4" />
      </records>
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
    </client>
  </clients>
</fitcoach_database>`;
