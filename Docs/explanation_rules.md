**# Explanation Validation Rules**



**Purpose:**

**Ensure LLM explanations are medically correct, mechanism-based, and non-hallucinated.**



**Every AI explanation must pass ALL rules.**



**--------------------------------------------------**



**RULE 1 — Must Mention Gene**

**The explanation must include the same gene returned in response.**

**If gene != mentioned gene → FAIL**



**Example FAIL:**

**Returned gene: CYP2C19**

**Explanation: “This drug is processed slower in liver enzymes”**

**(no gene name)**



**--------------------------------------------------**



**RULE 2 — Must Match Mechanism Knowledge Base**

**Explanation must match /data/mechanisms.json meaning.**



**If mechanism file says:**

**"reduced prodrug activation"**



**AI cannot say:**

**"increased drug activation"**



**Opposite biology → FAIL**



**--------------------------------------------------**



**RULE 3 — Must Justify Risk**

**Each risk must have biological reason:**



**Toxic → accumulation / overdose / increased active metabolite**

**Ineffective → reduced activation / rapid clearance**

**Adjust dose → altered metabolism**



**No reasoning → FAIL**



**--------------------------------------------------**



**RULE 4 — No Fabricated Claims**

**AI must NOT add:**



**• survival statistics**

**• treatment success percentages**

**• unrelated organs**

**• population genetics claims**



**If present → FAIL**



**--------------------------------------------------**



**RULE 5 — Length Constraint**

**3 to 5 sentences only.**



**Less → incomplete**

**More → hallucination risk**



**--------------------------------------------------**



**RULE 6 — Must Support Recommendation**

**If action = Avoid drug**

**Explanation must justify danger**



**If action = Alternative drug**

**Must explain why original drug fails**



**--------------------------------------------------**



**FINAL DECISION**



**Pass = All rules satisfied**

**Fail = Any single rule broken**



