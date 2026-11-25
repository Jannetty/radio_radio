# Marine Radio Operator Permit explanations, review copy

Generated from `app/data/explanations/e1.json` by `tools/explanations/review.py`. 141 of 144 questions have an explanation. Each quote below appears word for word in the linked source. "Heads up" notes mark places where the current rule differs from the exam's answer key; "general practice" marks answers with no rule to quote.

Questions without an explanation: 1-18C5, 1-20D1, 1-21D2

## Topic 1. Equipment Requirements

Transmitters used in the maritime services must, with a few exceptions, be FCC-certified, and how much radio a vessel must carry depends on what kind of vessel it is and how far from land it goes.

- With a few exceptions, maritime transmitters must be FCC-certified for Part 80 use. ([47 CFR §80.203](https://www.ecfr.gov/current/title-47/section-80.203))
- Small passenger vessels add an MF single-sideband radiotelephone once they go more than 20 nautical miles out. ([47 CFR §80.905](https://www.ecfr.gov/current/title-47/section-80.905))
- A compulsory ship's MF transmitter meets its 150-nautical-mile daytime range requirement with at least 60 W peak envelope power on 2182 kHz. ([47 CFR §80.855](https://www.ecfr.gov/current/title-47/section-80.855))
- Non-portable ship VHF transmitters run 8 to 25 W carrier power. ([47 CFR §80.215](https://www.ecfr.gov/current/title-47/section-80.215))
- DSC calls stations automatically, and a DSC distress alert is how GMDSS radios call for help. ([47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5))

### 1-1A1

What is a requirement of all marine transmitting apparatus used aboard United States vessels?

**A. Only equipment that has been certified by the FCC for Part 80 operations is authorized.**  
B. Equipment must be type-accepted by the U.S. Coast Guard for maritime mobile use.  
C. Certification is required by the International Maritime Organization (IMO).  
D. Programming of all maritime channels must be performed by a licensed Marine Radio Operator.  

Under the FCC's marine radio rules (Part 80), transmitters authorized in maritime stations must, with a few listed exceptions, be certified by the FCC for Part 80 operations. The Coast Guard and IMO set carriage and performance standards, but authorizing transmitters is the FCC's job.

- [47 CFR §80.203](https://www.ecfr.gov/current/title-47/section-80.203): “must be certified by the Commission for part 80 operations”

### 1-1A2

What transmitting equipment is authorized for use by a station in the maritime services?

A. Transmitters that have been certified by the manufacturer for maritime use.  
**B. Unless specifically excepted, only transmitters certified by the Federal Communications Commission for Part 80 operations.**  
C. Equipment that has been inspected and approved by the U.S. Coast Guard.  
D. Transceivers and transmitters that meet all ITU specifications for use in maritime mobile service.  

Part 80 requires each transmitter in a maritime station to be certified by the FCC for Part 80 operations, with a few listed exceptions. That's why the answer says "unless specifically excepted." Manufacturer self-certification, Coast Guard approval or ITU compliance don't replace FCC certification.

- [47 CFR §80.203](https://www.ecfr.gov/current/title-47/section-80.203): “except as indicated in paragraphs (g), (h) and (i) of this section, must be certified by the Commission for part 80 operations”

### 1-1A3

Small passenger vessels that sail 20 to 150 nautical miles from the nearest land must have what additional equipment?

A. Inmarsat-B terminal.  
B. Inmarsat-C terminal.  
C. Aircraft Transceiver with 121.5 MHz.  
**D. MF-HF SSB Transceiver.**  

Small passenger vessels that go beyond 20 nautical miles from land must add a medium-frequency single-sideband (J3E) radiotelephone to their VHF. Farther out, the rule requires an MF/HF single-sideband set or a GMDSS Inmarsat terminal. The MF-HF SSB transceiver is that added equipment.

> Heads up: The current rule draws the lines at 20, 100 and 200 nautical miles, not the question's 20 to 150. The exam still expects MF-HF SSB.

- [47 CFR §80.905](https://www.ecfr.gov/current/title-47/section-80.905): “must be equipped with a MF-DSC frequency transmitter meeting the requirements of § 80.1101(c)(3) and capable of transmitting J3E emission”

### 1-1A4

What equipment is programmed to initiate transmission of distress alerts and calls to individual stations?

A. NAVTEX.  
B. GPS.  
**C. DSC controller.**  
D. Scanning Watch Receiver.  

Digital selective calling (DSC) is the automated system used to call a particular station or group of stations, and a distress alert is itself a DSC call in the distress format. The DSC controller is the part of the radio that sends both. NAVTEX only receives safety broadcasts, and GPS only supplies position.

- [47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5): “used to establish contact with a station or group of stations automatically by means of radio”
- [47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5): “The distress signal is a digital selective call using an internationally recognized distress call format”

### 1-1A5

What is the minimum transmitter power level required by the FCC for a medium-frequency transmitter aboard a compulsorily fitted vessel?

A. At least 100 watts, single-sideband, suppressed-carrier power.  
**B. At least 60 watts PEP.**  
C. The power predictably needed to communicate with the nearest public coast station operating on 2182 kHz.  
D. At least 25 watts delivered into 50 ohms effective resistance when operated with a primary voltage of 13.6 volts DC.  

Part 80 requires a compulsory ship's MF radiotelephone transmitter to reach 150 nautical miles in daytime, and it meets that requirement if it delivers at least 60 watts peak envelope power (PEP) on 2182 kHz. PEP is the usual way to rate single-sideband transmitters.

- [47 CFR §80.855](https://www.ecfr.gov/current/title-47/section-80.855): “during daytime under normal conditions over a range of 150 nautical miles”
- [47 CFR §80.855](https://www.ecfr.gov/current/title-47/section-80.855): “The output power is not less than 60 watts peak envelope power for H3E and J3E emission on the frequency 2182 kHz”

### 1-1A6

Shipboard transmitters using F3E emission (FM voice) may not exceed what carrier power?

A. 500 watts.  
B. 250 watts.  
C. 100 watts.  
**D. 25 watts.**  

F3E is FM voice, which is what marine VHF radios use in the 156–162 MHz band. Part 80 limits a ship's VHF carrier power to between 8 and 25 watts (portable radios excepted).

- [47 CFR §80.215](https://www.ecfr.gov/current/title-47/section-80.215): “The carrier power of ship station radiotelephone transmitters, except portable transmitters, operating in the 156-162 MHz band must be at least 8 but not more than 25 watts.”

## Topic 2. License Requirements

Who needs a commercial operator license, which one, and what an operator has to do while on duty.

- Fixed-tuned ship radars operated only by external controls need no operator license. ([47 CFR §80.177](https://www.ecfr.gov/current/title-47/section-80.177))
- You can't get a commercial license if you can't send and receive spoken English by radiotelephone. ([47 CFR §13.9](https://www.ecfr.gov/current/title-47/section-13.9))
- GMDSS passenger ships carry at least two GMDSS-licensed operators. ([47 CFR §80.159](https://www.ecfr.gov/current/title-47/section-80.159))
- Great Lakes (subpart T) ships need someone with at least a Marine Radio Operator Permit. ([47 CFR §80.161](https://www.ecfr.gov/current/title-47/section-80.161))
- On duty, your license (or a photocopy) must be posted or on you. ([47 CFR §13.19](https://www.ecfr.gov/current/title-47/section-13.19))

### 1-2A1

Which commercial radio operator license is required to operate a fixed-tuned ship RADAR station with external controls?

A. A radio operator certificate containing a Ship RADAR Endorsement.  
B. A Marine Radio Operator Permit or higher.  
C. Either a First or Second Class Radiotelegraph certificate or a General Radiotelephone Operator License.  
**D. No radio operator authorization is required.**  

Part 80 lists the cases where no operator license is needed. One is a ship radar whose frequency is fixed (for example, set by a non-tunable magnetron) and that is operated only by external controls.

- [47 CFR §80.177](https://www.ecfr.gov/current/title-47/section-80.177): “No radio operator authorization is required to operate:”
- [47 CFR §80.177](https://www.ecfr.gov/current/title-47/section-80.177): “The radar frequency is determined by a nontunable, pulse type magnetron or other fixed tuned device”

### 1-2A2

When is a Marine Radio Operator Permit or higher license required for aircraft communications?

A. When operating on frequencies below 30 MHz allocated exclusively to aeronautical mobile services.  
B. When operating on frequencies above 30 MHz allocated exclusively to aeronautical mobile services.  
**C. When operating on frequencies below 30 MHz not allocated exclusively to aeronautical mobile services.**  
D. When operating on frequencies above 30 MHz not assigned for international use.  

The aviation rules (Part 87) set the minimum license for aircraft stations by frequency. Below 30 MHz on frequencies not set aside exclusively for aeronautical mobile use, the minimum is "MP," the Marine Radio Operator Permit. Below 30 MHz on exclusively aeronautical frequencies, a Restricted Radiotelephone Operator Permit is enough.

- [47 CFR §87.89](https://www.ecfr.gov/current/title-47/section-87.89): “Frequencies below 30 MHz not allocated exclusively to aeronautical mobile services MP or higher”
- [47 CFR §87.87](https://www.ecfr.gov/current/title-47/section-87.87): “MP Marine Radio Operator Permit”

### 1-2A3

Which of the following persons are ineligible to be issued a commercial radio operator license?

**A. Individuals who are unable to send and receive correctly by telephone spoken messages in English.**  
B. Handicapped persons with uncorrected disabilities which affect their ability to perform all duties required of commercial radio operators.  
C. Foreign maritime radio operators unless they are certified by the International Maritime Organization (IMO).  
D. U.S. Military radio operators who are still on active duty.  

The FCC's commercial operator rules say no one can be issued a commercial radio operator license if they can't send and receive spoken messages in English by telephone (radiotelephone). The other choices describe people the rules don't exclude.

- [47 CFR §13.9](https://www.ecfr.gov/current/title-47/section-13.9): “complete inability for any other reason to transmit correctly and to receive correctly by telephone spoken messages in English”

### 1-2A4

What are the radio operator requirements of a passenger ship equipped with a GMDSS installation?

A. The operator must hold a General Radiotelephone Operator License or higher-class license.  
B. The operator must hold a Restricted Radiotelephone Operator Permit or higher-class license.  
C. The operator must hold a Marine Radio Operator Permit or higher-class license.  
**D. Two operators on board must hold a GMDSS Radio Operator License or a Restricted GMDSS Radio Operator License, depending on the ship’s operating areas.**  

A passenger ship with a GMDSS installation must carry at least two people holding a GMDSS Radio Operator License. If it operates only within 20 nautical miles of shore, the two may hold either that license or a Restricted GMDSS Radio Operator License. So the requirement depends on where the ship operates.

- [47 CFR §80.159](https://www.ecfr.gov/current/title-47/section-80.159): “shall carry at least two persons holding an appropriate GMDSS Radio Operator License”

### 1-2A5

What is the minimum radio operator requirement for ships subject to the Great Lakes Radio Agreement?

A. Third Class Radiotelegraph Operator’s Certificate.  
B. General Radiotelephone Operator License.  
**C. Marine Radio Operator Permit.**  
D. Restricted Radiotelephone Operator Permit.  

Ships subject to the Great Lakes rules (Part 80, subpart T) must have an officer or crew member on board who holds at least a Marine Radio Operator Permit.

- [47 CFR §80.161](https://www.ecfr.gov/current/title-47/section-80.161): “must have on board an officer or member of the crew who holds a marine radio operator permit or higher class license”

### 1-2A6

What is a requirement of every commercial operator on duty and in charge of a transmitting system?

A. A copy of the Proof-of-Passing Certificate (PPC) must be in the station’s records.  
**B. The original license or a photocopy must be posted or in the operator’s personal possession and available for inspection.**  
C. The FCC Form 605 certifying the operator’s qualifications must be readily available at the transmitting system site.  
D. A copy of the operator’s license must be supplied to the radio station’s supervisor as evidence of technical qualification.  

When a commercial operator is on duty and in charge of a transmitting system, their license (or a photocopy) must be posted or carried on them, ready to show an FCC representative.

- [47 CFR §13.19](https://www.ecfr.gov/current/title-47/section-13.19): “must be posted or in the operator's personal possession, and available for inspection upon request by a FCC representative”

## Topic 3. Watchkeeping

Which frequencies a ship must listen to, and when.

- Compulsory vessels watch Channel 16 while underway. ([47 CFR §80.148](https://www.ecfr.gov/current/title-47/section-80.148))
- Cargo ships without MF-DSC also keep a continuous watch on 2182 kHz. ([47 CFR §80.305](https://www.ecfr.gov/current/title-47/section-80.305))
- 2182 kHz silence periods: 3 minutes at the top and bottom of each hour (UTC). ([47 CFR §80.304](https://www.ecfr.gov/current/title-47/section-80.304))
- GMDSS ships with MF/HF keep DSC watch on 2187.5 kHz, 8414.5 kHz and one more HF DSC frequency, plus Channel 70 on VHF. ([47 CFR §80.1123](https://www.ecfr.gov/current/title-47/section-80.1123))

### 1-3A1

Radio watches for compulsory radiotelephone stations will include the following:

A. VHF channel 22a continuous watch at sea.  
B. 121.5 MHz continuous watch at sea.  
**C. VHF channel 16 continuous watch.**  
D. 500 kHz.  

Compulsory vessels must keep a watch on VHF Channel 16 (156.800 MHz), the VHF distress, safety and calling channel, whenever they're underway and not using the radio for other traffic. 500 kHz was the old radiotelegraph (Morse) distress frequency, and 121.5 MHz is an aviation frequency.

- [47 CFR §80.148](https://www.ecfr.gov/current/title-47/section-80.148): “Each compulsory vessel, while underway, must maintain a watch for radiotelephone distress calls on 156.800 MHz whenever such station is not being used for exchanging communications.”

### 1-3A2

All compulsory equipped cargo ships (except those operating under GMDSS regulations or in a VTS) while being navigated outside of a harbor or port, shall keep a continuous radiotelephone watch on:

**A. 2182 kHz and Ch-16.**  
B. 2182 kHz.  
C. Ch-16.  
D. Cargo ships are exempt from radio watch regulations.  

A U.S. cargo ship equipped with a radiotelephone station under the Communications Act or SOLAS must, outside a harbor or port, keep a continuous watch on 2182 kHz (if it doesn't carry MF-DSC equipment) and on VHF Channel 16 (156.800 MHz). So the answer is both frequencies, not just one.

- [47 CFR §80.305](https://www.ecfr.gov/current/title-47/section-80.305): “If it is not carrying MF-DSC radio equipment, keep a continuous watch on 2182 kHz in the room from which the vessel is normally steered while at sea”
- [47 CFR §80.305](https://www.ecfr.gov/current/title-47/section-80.305): “Keep a continuous watch on 156.800 MHz from the room from which the vessel is normally steered.”

### 1-3A3

What channel must all compulsory, non-GMDSS vessels monitor at all times in the open sea?

A. Channel 8.  
B. Channel 70.  
C. Channel 6.  
**D. Channel 16.**  

Channel 16 (156.800 MHz) is the VHF distress, safety and calling channel, and compulsory vessels must monitor it while underway. The watch also gives ships without DSC a way to call GMDSS ships. Channel 70 is for DSC data only, Channel 6 is the intership safety channel, and Channel 8 is a commercial intership working channel.

- [47 CFR §80.148](https://www.ecfr.gov/current/title-47/section-80.148): “the watch on 156.800 MHz is provided so that ships not fitted with DSC will be able to call GMDSS ships”
- [47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373): “Intership Safety 06 156.300”

### 1-3A4

When a watch is required on 2182 kHz, at how many minutes past the hour must a 3 minute silent period be observed?

**A. 00, 30.**  
B. 15, 45.  
C. 10, 40.  
D. 05, 35.  

Ships using radiotelephony in the 1605–3500 kHz band must listen on 2182 kHz for 3 minutes twice an hour, starting at the top and bottom of the hour (UTC). Only distress, urgency and safety messages may be sent during those silence periods.

- [47 CFR §80.304](https://www.ecfr.gov/current/title-47/section-80.304): “This watch must be maintained at least twice each hour for 3 minutes commencing at x h.00 and x h.30 Coordinated Universal Time (UTC)”

### 1-3A5

Which is true concerning a required watch on VHF Ch-16?

A. It is compulsory at all times while at sea until further notice, unless the vessel is in a VTS system.  
B. When a vessel is in an A1 sea area and subject to the Bridge-to-Bridge act and in a VTS system, a watch is not required on Ch-16, provided the vessel monitors both Ch-13 and VTS channel.  
C. It is always compulsory in sea areas A2, A3 and A4.  
**D. All of the above.**  

Part 80 requires compulsory vessels to watch Channel 16 while underway, and it requires every GMDSS ship at sea to keep a continuous Channel 16 listening watch when practicable. One exception is a ship subject to the Bridge-to-Bridge Act that is taking part in a Vessel Traffic Service and keeps watch on both the bridge-to-bridge channel (usually 13) and its VTS channel. Each choice describes part of that, so the answer is all of them.

> Heads up: The rule text doesn't list sea areas A2, A3 and A4 separately. The Channel 16 watch (kept when practicable under the GMDSS rules) applies at sea everywhere, which includes those areas.

- [47 CFR §80.148](https://www.ecfr.gov/current/title-47/section-80.148): “For vessels subject to the Bridge-to-Bridge Act and participating in a Vessel Traffic Service (VTS) system when the watch is maintained on both the bridge-to-bridge frequency and a separately assigned VTS frequency.”
- [47 CFR §80.1123](https://www.ecfr.gov/current/title-47/section-80.1123): “Every ship while at sea must maintain, when practicable, a continuous listening watch on VHF Channel 16.”

### 1-3A6

What are the mandatory DSC watchkeeping bands/channels?

A. VHF Ch-70, 2 MHz MF DSC, 6 MHz DSC and 1 other HF DSC.  
**B. 8 MHz HF DSC, 1 other HF DSC, 2 MHz MF DSC and VHF Ch-70.**  
C. 2 MHz MF DSC, 8 MHz DSC, VHF Ch-16 and 1 other HF DSC.  
D. None of the above.  

A GMDSS ship with MF/HF equipment must keep a continuous DSC watch on 2187.5 kHz (MF) and 8414.5 kHz (8 MHz HF), plus at least one other HF DSC frequency chosen for the time of day and position. A ship with VHF equipment must also watch DSC Channel 70.

- [47 CFR §80.1123](https://www.ecfr.gov/current/title-47/section-80.1123): “On the distress and safety DSC frequencies 2187.5 kHz and 8414.5 kHz also on at least one of the distress and safety DSC frequencies 4207.5 kHz, 6312 kHz, 12577 kHz, or 16804.5 kHz”
- [47 CFR §80.1123](https://www.ecfr.gov/current/title-47/section-80.1123): “On VHF DSC channel 70”

## Topic 4. Logkeeping

Who keeps the station log, where it's kept, how it's corrected and how long it's kept.

- The station licensee and the operator in charge are both responsible for the logs. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))
- Only the person who made an entry may correct it: strike out, initial and date. No erasing. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))
- Keep logs for 2 years, or 3 years if they involve distress or disaster. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))
- Ship radiotelephone logs stay at the principal operating position while under way. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))

### 1-4A1

Who is required to make entries in a required service or maintenance log?

A. The licensed operator or a person whom he or she designates.  
**B. The operator responsible for the station operation or maintenance.**  
C. Any commercial radio operator holding at least a Restricted Radiotelephone Operator Permit.  
D. The technician who actually makes the adjustments to the equipment.  

The FCC's operator rules say that wherever a station log or service and maintenance log is required, the operator responsible for operating or maintaining the station makes the entries. That responsibility can't be handed off to someone else.

- [47 CFR §13.19](https://www.ecfr.gov/current/title-47/section-13.19): “the operator responsible for the station operation or maintenance shall make the required entries in the station log”

### 1-4A2

Who is responsible for the proper maintenance of station logs?

A. The station licensee.  
B. The commercially-licensed radio operator in charge of the station.  
C. The ship’s master and the station licensee.  
**D. The station licensee and the radio operator in charge of the station.**  

Part 80 puts responsibility for station logs on two parties together: the station licensee and the radio operator in charge of the station.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “The station licensee and the radio operator in charge of the station are responsible for the maintenance of station logs.”

### 1-4A3

Where must ship station logs be kept during a voyage?

**A. At the principal radiotelephone operating position.**  
B. They must be secured in the vessel’s strongbox for safekeeping.  
C. In the personal custody of the licensed commercial radio operator.  
D. All logs are turned over to the ship’s master when the radio operator goes off duty.  

Ship radiotelephone logs must be kept at the principal radiotelephone operating position while the vessel is under way. That way, whoever is on watch can make entries and the log is available for inspection.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “must be kept at the principal radiotelephone operating location while the vessel is being navigated”

### 1-4A4

What is the proper procedure for making a correction in the station log?

A. The ship’s master must be notified, approve and initial all changes to the station log.  
B. The mistake may be erased and the correction made and initialized only by the radio operator making the original error.  
**C. The original person making the entry must strike out the error, initial the correction and indicate the date of the correction.**  
D. Rewrite the new entry in its entirety directly below the incorrect notation and initial the change.  

Logs can't be erased. Only the person who made the original entry may correct it, by striking out the error, initialing the correction and noting the date it was corrected.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “Corrections may be made only by the person originating the entry by striking out the error, initialing the correction and indicating the date of correction.”

### 1-4A5

How long should station logs be retained when there are entries relating to distress or disaster situations?

A. Until authorized by the Commission in writing to destroy them.  
**B. For a period of three years from the last date of entry, unless notified by the FCC.**  
C. Indefinitely, or until destruction is specifically authorized by the U.S. Coast Guard.  
D. For a period of one year from the last date of entry.  

Logs are normally kept for two years, but any log relating to a distress situation or disaster must be kept for three years from the date of entry. Logs the FCC is investigating must be kept until the FCC authorizes their destruction in writing.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “Logs relating to a distress situation or disaster must be retained for three years from the date of entry.”

### 1-4A6

How long should station logs be retained when there are no entries relating to distress or disaster situations?

A. For a period of three years from the last date of entry, unless notified by the FCC.  
B. Until authorized by the Commission in writing to destroy them.  
**C. For a period of two years from the last date of entry.**  
D. Indefinitely, or until destruction is specifically authorized by the U.S. Coast Guard.  

The standard retention period for station logs is two years from the date of entry. Longer periods apply in special cases: three years for distress or disaster, until the FCC authorizes destruction when it is investigating, and until a claim or complaint is settled or barred.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “Logs must be retained by the licensee for a period of two years from the date of entry”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “Logs relating to any claim or complaint of which the station licensee has notice must be retained until the claim or complaint has been satisfied or barred”

## Topic 5. Log Entries

What goes into a ship's radio (and GMDSS) log.

- Log daily equipment checks and GMDSS tests, plus a pre-departure check entry. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))
- Summarize distress and urgency traffic that affects your own ship. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))
- Log safety traffic only when it's on channels other than VHF and affects your ship. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))
- Check reserve batteries and log it at least every 30 days. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))
- Abbreviations are fine if they're explained in the same log. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))

### 1-5A1

Radiotelephone stations required to keep logs of their transmissions must include:

A. Station, date and time.  
B. Name of operator on duty.  
C. Station call signs with which communication took place.  
**D. All of these.**  

A station log has to show what happened, when, and who was involved. Part 80's log rules call for the date and time of each entry, which operator was on duty, and which stations were worked: coast station logs need ON DUTY and OFF DUTY entries, and radiotelegraph logs record the call letters of stations communicated with. Ship logs must also identify the vessel. The exam treats all three as required log content, so the answer is all of them.

> Heads up: Today's rule for ship radiotelephone logs (§80.409(e)) mostly lists distress, safety and equipment-test entries. The operator and call-sign details quoted here come from the coast-station and radiotelegraph log rules in the same section.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “The date and time of making an entry must be shown opposite the entry.”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): ““ON DUTY” must be entered by the operator beginning a duty period”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “call letters of the station communicated with or heard”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “Ship station logs must identify the vessel name, country of registry, and official number of the vessel.”

### 1-5A2

Which of the following is true?

A. Battery test must be logged daily.  
**B. EPIRB tests are normally logged monthly.**  
C. Radiotelephone tests are normally logged weekly.  
D. None of the above.  

Part 80's ship log rules rule out the other two choices. Radiotelephone equipment needs a daily log statement, not a weekly one, and reserve batteries need a check entry at least once every 30 days, not daily. That leaves the EPIRB choice.

> Heads up: Part 80 asks for a weekly log entry that the EPIRBs have been inspected. The exam's key says EPIRB tests are logged monthly, which matches the common monthly EPIRB self-test. Expect "monthly" on the exam.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “A daily statement about the condition of the required radiotelephone equipment”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “An entry at least once every thirty days that the batteries or other reserve power sources have been checked and are functioning properly.”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “The EPIRBs have been inspected.”

### 1-5A3

Where should the GMDSS radio log be kept on board ship?

A. Captain’s office.  
B. Sea cabin.  
**C. At the GMDSS operating position.**  
D. Anywhere on board the vessel.  

The radio log has to be where the radio watch is kept. Part 80 requires ship radiotelephone and GMDSS logs to be kept at the principal radiotelephone operating location, the GMDSS operating position, while the vessel is under way.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “must be kept at the principal radiotelephone operating location while the vessel is being navigated”

### 1-5A4

Which of the following statements is true?

**A. Key letters or abbreviations may be used in GMDSS Radio Logbooks if their meaning is noted in the log.**  
B. Key letters or abbreviations may not be used in GMDSS Radio Logbooks under any circumstances.  
C. All Urgency communications must be entered in the logbook.  
D. None of the above.  

Abbreviations and key letters are allowed in station logs, as long as their meaning is explained somewhere in the same log.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “Key letters or abbreviations may be used if their proper meaning or explanation is contained elsewhere in the same log.”

### 1-5A5

Which of the following logkeeping statements is true?

A. Entries relating to pre-voyage, pre-departure and daily tests are required.  
**B. Both a) and c)**  
C. A summary of all required Distress communications heard and Urgency communications affecting the station’s own ship. Also, all Safety communications (other than VHF) affecting the station’s own ship must be logged.  
D. Routine daily MF-HF and Inmarsat-C transmissions do not have to be logged.  

Statement a) is true: Part 80 requires an entry that pre-departure equipment checks were satisfactory, plus daily entries of satisfactory GMDSS equipment tests. Statement c) is also true: the ship radiotelephone log must contain a summary of distress and urgency communications affecting your own ship, and a summary of safety communications on other than VHF channels that affect your own ship. So the answer is “both a) and c).”

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “An entry that pre-departure equipment checks were satisfactory and that required publications are on hand. Daily entries of satisfactory tests to ensure the continued proper functioning of GMDSS equipment shall be made.”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “A summary of all distress and urgency communications affecting the station's own ship”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “A summary of safety communications on other than VHF channels affecting the station's own ship”

### 1-5A6

Which of the following statements concerning log entries is false?

**A. All Safety communications received on VHF must be logged.**  
B. All required equipment tests must be logged.  
C. The radio operator must log on and off watch.  
D. The vessels daily position must be entered in the log.  

Safety communications only have to be logged when they're on channels other than VHF and affect your own ship. So "all safety communications received on VHF must be logged" is the false statement. Required equipment tests, by contrast, must be logged.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “A summary of safety communications on other than VHF channels affecting the station's own ship.”
- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “Results of required equipment tests”

## Topic 6. Miscellaneous Rules & Regulations

General rules: what governs ship stations, who is in charge, and where the radio has to be.

- Ship stations follow Part 80 plus the international Radio Regulations. ([47 CFR §80.86](https://www.ecfr.gov/current/title-47/section-80.86))
- The master has ultimate control of the station. ([47 CFR §80.114](https://www.ecfr.gov/current/title-47/section-80.114))
- The principal operating position is where the ship is steered. ([47 CFR §80.853](https://www.ecfr.gov/current/title-47/section-80.853))
- Ship inspections are now done by FCC-licensed technicians, not the FCC itself. ([47 CFR §80.59](https://www.ecfr.gov/current/title-47/section-80.59))

### 1-6A1

What regulations govern the use and operation of FCC-licensed ship stations in international waters?

A. The regulations of the International Maritime Organization (IMO) and Radio Officers Union.  
**B. Part 80 of the FCC Rules plus the international Radio Regulations and agreements to which the United States is a party.**  
C. The Maritime Mobile Directives of the International Telecommunication Union.  
D. Those of the FCC’s Wireless Telecommunications Bureau, Maritime Mobile Service, Washington, DC 20554.  

U.S. ship stations are governed by the FCC's Part 80 rules plus the international Radio Regulations and other radio agreements the United States has joined. The IMO and the radio officers' union don't issue binding radio regulations for these stations.

- [47 CFR §80.86](https://www.ecfr.gov/current/title-47/section-80.86): “In addition to being regulated by these rules, the use and operation of stations subject to this part are governed by the Radio Regulations and the radio provisions of all other international agreements in force to which the United States is a party.”

### 1-6A2

When may the operator of a ship radio station allow an unlicensed person to speak over the transmitter?

A. At no time. Only commercially-licensed radio operators may modulate the transmitting apparatus.  
B. When the station power does not exceed 200 watts peak envelope power.  
**C. When under the supervision of the licensed operator.**  
D. During the hours that the radio officer is normally off duty.  

On ships that must carry a licensed operator, the operator may let an unlicensed person talk on the radio, with the station licensee's or master's authorization. Morse code radiotelegraphy is the one exception. The licensed operator stays responsible, which is why the answer is "under the supervision of the licensed operator."

- [47 CFR §80.156](https://www.ecfr.gov/current/title-47/section-80.156): “may, if authorized by the station licensee or master, permit an unlicensed person to modulate the transmitting apparatus for all modes of communication except Morse code radiotelegraphy”

### 1-6A3

Where do you make an application for inspection of a ship GMDSS radio station?

A. To a Commercial Operator Licensing Examination Manager (COLE Manager).  
B. To the Federal Communications Commission, Washington, DC 20554.  
**C. To the Engineer-in-Charge of the FCC District Office nearest the proposed place of inspection.**  
D. To an FCC-licensed technician holding a GMDSS Radio Maintainer’s License.  

The exam's answer reflects the older procedure, when you asked the FCC's local field office (its Engineer-in-Charge) to inspect a ship's radio station.

> Heads up: This has changed. The FCC now says it will not normally inspect these ships. The required inspection is done by an FCC-licensed technician (for example, a GMDSS Radio Maintainer or GROL holder) who isn't connected to the vessel. Expect the 2009 answer on the exam.

- [47 CFR §80.59](https://www.ecfr.gov/current/title-47/section-80.59): “The FCC will not normally conduct the required inspections of ships”
- [47 CFR §80.59](https://www.ecfr.gov/current/title-47/section-80.59): “The mandatory inspection of U.S. vessels must be conducted by an FCC-licensed technician”

### 1-6A4

Who has ultimate control of service at a ship’s radio station?

**A. The master of the ship.**  
B. A holder of a First Class Radiotelegraph Certificate with a six months’ service endorsement.  
C. The Radio Officer-in-Charge authorized by the captain of the vessel.  
D. An appointed licensed radio operator who agrees to comply with all Radio Regulations in force.  

The master always has ultimate control of a ship's radio station, and must make sure every operator follows the Radio Regulations.

- [47 CFR §80.114](https://www.ecfr.gov/current/title-47/section-80.114): “The service of each ship station must at all times be under the ultimate control of the master”

### 1-6A5

Where must the principal radiotelephone operating position be installed in a ship station?

A. At the principal radio operating position of the vessel.  
B. In the chart room, master’s quarters or wheel house.  
**C. In the room or an adjoining room from which the ship is normally steered while at sea.**  
D. At the level of the main wheel house or at least one deck above the ship’s main deck.  

The principal operating position of a ship's radiotelephone station must be in the room from which the ship is normally steered at sea, so the watch is kept where the ship is navigated. On some older small cargo ships (300 to 500 gross tons, keel laid before 1965), the rule allows it in a room adjoining and opening into the steering room, which is why the answer mentions an adjoining room.

- [47 CFR §80.853](https://www.ecfr.gov/current/title-47/section-80.853): “The principal operating position of the radiotelephone station must be in the room from which the ship is normally steered while at sea.”
- [47 CFR §80.853](https://www.ecfr.gov/current/title-47/section-80.853): “may be in a room adjoining and opening into the room from which the vessel is normally steered while at sea”

### 1-6A6

By international agreement, which ships must carry radio equipment for the safety of life at sea?

A. All ships traveling more than 100 miles out to sea.  
B. Cargo ships of more than 100 gross tons and passenger vessels on international deep-sea voyages.  
C. All cargo ships of more than 100 gross tons.  
**D. Cargo ships of more than 300 gross tons and vessels carrying more than 12 passengers.**  

Under the Safety of Life at Sea (SOLAS) Convention, a passenger ship is one carrying more than 12 passengers, and the radio requirements apply to passenger ships of any size and to cargo ships of 300 gross tons and up.

- [47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5): “a ship is a passenger ship if it carries or is licensed or certificated to carry more than twelve passengers”
- [47 CFR §80.871](https://www.ecfr.gov/current/title-47/section-80.871): “All passenger ships irrespective of size and all cargo ships of 300 gross tons and upwards subject to part II of title III of the Communications Act or to the Safety Convention”

## Topic 7. Bridge-to-Bridge Operations

Bridge-to-bridge radio (usually Channel 13) lets vessels talk directly about navigation, and Vessel Traffic Services manage traffic in busy waterways.

- Bridge-to-bridge stations are for navigational communications only. ([47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5))
- Channel 13 is the designated bridge-to-bridge channel on U.S. navigable waters (67 in one area). ([33 CFR §26.04](https://www.ecfr.gov/current/title-33/section-26.04))
- More than 1 W only for an emergency, no answer to a second low-power call, or a blind broadcast. ([47 CFR §80.331](https://www.ecfr.gov/current/title-47/section-80.331))
- On bridge-to-bridge channels you may identify by ship name. ([47 CFR §80.102](https://www.ecfr.gov/current/title-47/section-80.102))

### 1-7B1

What traffic management service is operated by the U.S. Coast Guard in certain designated water areas to prevent ship collisions, groundings and environmental harm?

A. Water Safety Management Bureau (WSMB).  
**B. Vessel Traffic Service (VTS).**  
C. Ship Movement and Safety Agency (SMSA).  
D. Interdepartmental Harbor and Port Patrol (IHPP).  

A Vessel Traffic Service (VTS) is a Coast Guard service that manages vessel traffic in designated waterways. Its purpose is to reduce collisions, rammings and groundings and to protect the environment. The other choices are made-up agency names.

- [33 CFR §161.2](https://www.ecfr.gov/current/title-33/section-161.2): “Vessel Traffic Services (VTS) means a service implemented by the United States Coast Guard designed to improve the safety and efficiency of vessel traffic and to protect the environment.”
- [33 CFR §161.1](https://www.ecfr.gov/current/title-33/section-161.1): “reducing the potential for collisions, rammings, and groundings”

### 1-7B2

What is a bridge-to-bridge station?

A. An internal communications system linking the wheel house with the ship’s primary radio operating position and other integral ship control points.  
B. An inland waterways and coastal radio station serving ship stations operating within the United States.  
C. A portable ship station necessary to eliminate frequent application to operate a ship station on board different vessels.  
**D. A VHF radio station located on a ship’s navigational bridge or main control station that is used only for navigational communications.**  

Part 80 defines a bridge-to-bridge station as a VHF station on a ship's navigational bridge or main control station, used only for navigational communications in the 156–162 MHz band.

- [47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5): “Bridge-to-bridge station. A radio station located on a ship's navigational bridge or main control station operating on a specified frequency which is used only for navigational communications, in the 156-162 MHz band.”

### 1-7B3

When may a bridge-to-bridge transmission be more than 1 watt?

**A. When broadcasting a distress message and rounding a bend in a river or traveling in a blind spot.**  
B. When broadcasting a distress message.  
C. When rounding a bend in a river or traveling in a blind spot.  
D. When calling the Coast Guard.  

Bridge-to-bridge transmissions are normally limited to 1 watt. More power is allowed only in an emergency, when the called vessel hasn't answered a second call at low power, or for a broadcast in a blind situation like rounding a bend in a river. The answer names two of those situations, distress (an emergency) and rounding a bend.

- [47 CFR §80.331](https://www.ecfr.gov/current/title-47/section-80.331): “Use of power greater than 1 watt in a bridge-to-bridge station shall be limited to the following three situations:”
- [47 CFR §80.331](https://www.ecfr.gov/current/title-47/section-80.331): “A broadcast call as in paragraph (a)(1) of this section in a blind situation, e.g., rounding a bend in a river.”

### 1-7B4

When is it legal to transmit high power on Channel 13?

A. Failure of vessel being called to respond.  
B. In a blind situation such as rounding a bend in a river.  
C. During an emergency.  
**D. All of these.**  

Part 80 lists exactly three situations where a bridge-to-bridge station may use more than 1 watt: an emergency, a vessel that doesn't respond to a second call at low power, and a broadcast in a blind situation such as rounding a bend. All three choices are on that list.

- [47 CFR §80.331](https://www.ecfr.gov/current/title-47/section-80.331): “Failure of the vessel being called to respond to a second call at low power.”
- [47 CFR §80.331](https://www.ecfr.gov/current/title-47/section-80.331): “Emergency.”

### 1-7B5

A ship station using VHF bridge-to-bridge Channel 13:

**A. May be identified by the name of the ship in lieu of call sign.**  
B. May be identified by call sign and country of origin.  
C. Must be identified by call sign and name of vessel.  
D. Does not need to identify itself within 100 miles from shore.  

On a VHF bridge-to-bridge channel such as Channel 13, a ship may identify by its name instead of its call sign. Other ships can see the name, so it's more useful for navigation.

- [47 CFR §80.102](https://www.ecfr.gov/current/title-47/section-80.102): “Ship stations transmitting on any authorized VHF bridge-to-bridge channel may be identified by the name of the ship in lieu of the call sign.”

### 1-7B6

The primary purpose of bridge-to-bridge communications is:

A. Search and rescue emergency calls only.  
B. All short-range transmission aboard ship.  
**C. Navigational communications.**  
D. Transmission of Captain's orders from the bridge.  

Bridge-to-bridge communications exist for navigation. Coast Guard rules say the designated bridge-to-bridge frequency may carry only information needed for the safe navigation of vessels, or necessary tests.

- [33 CFR §26.04](https://www.ecfr.gov/current/title-33/section-26.04): “No person may use the frequency designated by the Federal Communications Commission under section 8 of the Act, 33 U.S.C. 1207(a), to transmit any information other than information necessary for the safe navigation of vessels or necessary tests.”

## Topic 8. Operating Procedures-1

Everyday operating courtesy: listen first, obey the coast station, keep calling channels clear.

- Listen before you transmit, except for distress. ([47 CFR §80.92](https://www.ecfr.gov/current/title-47/section-80.92))
- Follow the coast or government station's instructions. ([47 CFR §80.94](https://www.ecfr.gov/current/title-47/section-80.94))
- After contact on 2182 or Channel 16, move to a working frequency. ([47 CFR §80.116](https://www.ecfr.gov/current/title-47/section-80.116))
- Priority: distress, urgency, safety, then everything else. ([47 CFR §80.91](https://www.ecfr.gov/current/title-47/section-80.91))
- Coast stations announce waiting traffic with traffic lists of call signs in alphabetical order. ([Recommendation ITU-R M.1171-1](https://www.itu.int/rec/R-REC-M.1171/en))

### 1-8B1

What is the best way for a radio operator to minimize or prevent interference to other stations?

A. By using an omni-directional antenna pointed away from other stations.  
B. Reducing power to a level that will not affect other on-frequency communications.  
**C. Determine that a frequency is not in use by monitoring the frequency before transmitting.**  
D. By changing frequency when notified that a radiocommunication causes interference.  

The basic rule for avoiding interference is to listen first. Before transmitting, the operator must check that the frequency isn't in use. The only exception is distress, which never has to wait.

- [47 CFR §80.92](https://www.ecfr.gov/current/title-47/section-80.92): “The station operator must determine that the frequency is not in use by monitoring the frequency before transmitting, except for transmission of signals of distress.”

### 1-8B2

Under what circumstances may a coast station using telephony transmit a general call to a group of vessels?

A. Under no circumstances.  
**B. When announcing or preceding the transmission of Distress, Urgency, Safety or other important messages.**  
C. When the vessels are located in international waters beyond 12 miles.  
D. When identical traffic is destined for multiple mobile stations within range.  

Coast stations normally have to call the particular station they want. The exception is a general call to all stations announcing or preceding distress, urgency or safety messages.

- [47 CFR §80.111](https://www.ecfr.gov/current/title-47/section-80.111): “Except when transmitting a general call to all stations for announcing or preceding the transmission of distress, urgency, or safety messages, a coast station must call the particular station(s) with which it intends to communicate.”

### 1-8B3

Who determines when a ship station may transmit routine traffic destined for a coast or government station in the maritime mobile service?

A. Shipboard radio officers may transmit traffic when it will not interfere with ongoing radiocommunications.  
B. The order and time of transmission and permissible type of message traffic is decided by the licensed on-duty operator.  
**C. Ship stations must comply with instructions given by the coast or government station.**  
D. The precedence of conventional radiocommunications is determined by FCC and international regulation.  

When a ship works a coast station or a government station, the shore station is in charge. The ship must follow its instructions on the order and timing of transmissions, the frequency, and the type of traffic. Distress is the only exception.

- [47 CFR §80.94](https://www.ecfr.gov/current/title-47/section-80.94): “ship stations must comply with the instruction given by the coast station or Government station relative to the order and time of transmission”

### 1-8B4

What is required of a ship station which has established initial contact with another station on 2182 kHz or Ch-16?

**A. The stations must change to an authorized working frequency for the transmission of messages.**  
B. The stations must check the radio channel for Distress, Urgency and Safety calls at least once every ten minutes.  
C. Radiated power must be minimized so as not to interfere with other stations needing to use the channel.  
D. To expedite safety communications, the vessels must observe radio silence for two out of every fifteen minutes.  

2182 kHz and Channel 16 are for calling and distress, so they have to be kept clear. Once two ships make contact there, they must move to a working frequency to pass their messages.

- [47 CFR §80.116](https://www.ecfr.gov/current/title-47/section-80.116): “After establishing communication with another station by call and reply on 2182 kHz or 156.800 MHz stations on board ship must change to an authorized working frequency for the transmission of messages.”

### 1-8B5

How does a coast station notify a ship that it has a message for the ship?

A. By making a directed transmission on 2182 kHz or 156.800 MHz.  
B. The coast station changes to the vessel’s known working frequency.  
C. By establishing communications using the eight-digit maritime mobile service identification.  
**D. The coast station may transmit, at intervals, lists of call signs in alphabetical order for which they have traffic.**  

Coast stations announce waiting messages by broadcasting "traffic lists" at scheduled times. A traffic list gives, in alphabetical order, the call signs of the ships the station has traffic for. Ships listen for their call sign, then call in.

- [Recommendation ITU-R M.1171-1, Radiotelephony procedures for routine calls in the maritime mobile service](https://www.itu.int/rec/R-REC-M.1171/en): “of “traffic lists” consisting of the call signs or other identification in alphabetical order of all ship”

### 1-8B6

What is the priority of communications?

A. Safety, Distress, Urgency and radio direction-finding.  
**B. Distress, Urgency and Safety.**  
C. Distress, Safety, radio direction-finding, search and rescue.  
D. Radio direction-finding, Distress and Safety.  

Maritime communications have a fixed order of priority: distress first, then urgency, then safety, then everything else.

- [47 CFR §80.91](https://www.ecfr.gov/current/title-47/section-80.91): “Distress calls, distress messages, and distress traffic.”
- [47 CFR §80.91](https://www.ecfr.gov/current/title-47/section-80.91): “Urgency communications.”
- [47 CFR §80.91](https://www.ecfr.gov/current/title-47/section-80.91): “Safety communications.”

## Topic 9. Operating Procedures-2

How to call, identify and spell over the radio.

- Calls last no more than 30 seconds, then wait 2 minutes before trying again. ([47 CFR §80.116](https://www.ecfr.gov/current/title-47/section-80.116))
- Identify at the beginning and end of each communication, and every 15 minutes during long ones. ([47 CFR §80.102](https://www.ecfr.gov/current/title-47/section-80.102))
- Call coast stations on their working frequency when you can. ([47 CFR §80.116](https://www.ecfr.gov/current/title-47/section-80.116))
- Spell with the international phonetic alphabet (Echo, Mike, Sierra …). ([FAA Aeronautical Information Manual](https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_2.html))

### 1-9B1

Under what circumstances may a ship or aircraft station interfere with a public coast station?

**A. In cases of distress.**  
B. Under no circumstances during on-going radiocommunications.  
C. During periods of government priority traffic handling.  
D. When it is necessary to transmit a message concerning the safety of navigation or important meteorological warnings.  

Ships and aircraft must not interfere with public coast stations, and must stop or change frequency at the coast station's first request. A distress situation is the one exception.

- [47 CFR §80.92](https://www.ecfr.gov/current/title-47/section-80.92): “Except in cases of distress, communications between ship stations or between ship and aircraft stations must not interfere with public coast stations.”

### 1-9B2

Ordinarily, how often would a station using a telephony emission identify?

A. At least every 10 minutes.  
**B. At the beginning and end of each transmission and at 15-minute intervals.**  
C. At 15-minute intervals, unless public correspondence is in progress.  
D. At 20-minute intervals.  

Stations using voice must give their call sign at the beginning and end of each communication, and every 15 minutes during a long transmission.

- [47 CFR §80.102](https://www.ecfr.gov/current/title-47/section-80.102): “At the beginning and end of each communication with any other station.”
- [47 CFR §80.102](https://www.ecfr.gov/current/title-47/section-80.102): “At 15 minute intervals when transmission is sustained for more than 15 minutes.”

### 1-9B3

When using a SSB station on 2182 kHz or VHF-FM on channel 16:

A. Preliminary call must not exceed 30 seconds.  
B. If contact is not made, you must wait at least 2 minutes before repeating the call.  
C. Once contact is established, you must switch to a working frequency.  
**D. All of these.**  

A ship's call on 2182 kHz or Channel 16 can't last more than 30 seconds. If there's no answer, wait 2 minutes before calling again. Once contact is made, both stations must move to a working frequency. All three statements are rules, so the answer is all of them.

- [47 CFR §80.116](https://www.ecfr.gov/current/title-47/section-80.116): “Calling a particular station must not continue for more than 30 seconds in each instance. If the called station does not reply, the station must not again be called until after an interval of 2 minutes.”
- [47 CFR §80.116](https://www.ecfr.gov/current/title-47/section-80.116): “stations on board ship must change to an authorized working frequency for the transmission of messages”

### 1-9B4

What should a station operator do before making a transmission?

**A. Except for the transmission of distress calls, determine that the frequency is not in use by monitoring the frequency before transmitting.**  
B. Transmit a general notification that the operator wishes to utilize the channel.  
C. Check transmitting equipment to be certain it is properly calibrated.  
D. Ask if the frequency is in use.  

Before transmitting, the operator must listen to make sure the frequency isn't in use. Distress calls are the one exception.

- [47 CFR §80.92](https://www.ecfr.gov/current/title-47/section-80.92): “The station operator must determine that the frequency is not in use by monitoring the frequency before transmitting, except for transmission of signals of distress.”

### 1-9B5

On what frequency should a ship station normally call a coast station when using a radiotelephony emission?

A. On a vacant radio channel determined by the licensed radio officer.  
**B. Calls should be initiated on the appropriate ship-to-shore working frequency of the coast station.**  
C. On any calling frequency internationally approved for use within ITU Region 2.  
D. On 2182 kHz or Ch-16 at any time.  

Ships are allowed to call coast stations on 2182 kHz or Channel 16, but the rules say such calls should be made on the coast station's appropriate ship-to-shore working frequency. That keeps the distress and calling frequencies clear.

- [47 CFR §80.116](https://www.ecfr.gov/current/title-47/section-80.116): “Use by ship stations of the frequency 2182 kHz for calling coast stations and for replying to calls from coast stations is authorized. However, such calls and replies should be on the appropriate ship-shore working frequency.”

### 1-9B6

In the International Phonetic Alphabet, the letters E, M, and S are represented by the words:

A. Echo, Michigan, Sonar.  
B. Equator, Mike, Sonar.  
**C. Echo, Mike, Sierra**  
D. Element, Mister, Scooter  

The international phonetic alphabet (the same one ICAO and the ITU use) spells E, M and S as Echo, Mike and Sierra.

- [FAA Aeronautical Information Manual, 4-2-7 Phonetic Alphabet](https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_2.html): “Echo (ECK-OH)”
- [FAA Aeronautical Information Manual, 4-2-7 Phonetic Alphabet](https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_2.html): “Mike (MIKE)”
- [FAA Aeronautical Information Manual, 4-2-7 Phonetic Alphabet](https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_2.html): “Sierra (SEE-AIR-RAH)”

## Topic 10. Distress Communications

MAYDAY: the highest-priority call there is.

- Distress means grave and imminent danger requiring immediate assistance. ([47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314))
- The call: MAYDAY ×3, THIS IS, name or call sign ×3, then position, nature of distress, help needed and other details. ([47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314))
- Distress has absolute priority; everyone else stops transmitting and listens. ([47 CFR §80.312](https://www.ecfr.gov/current/title-47/section-80.312))
- Only the master or person responsible can authorize a distress call. ([47 CFR §80.311](https://www.ecfr.gov/current/title-47/section-80.311))

### 1-10B1

What information must be included in a Distress message?

A. Name of vessel.  
B. Location.  
C. Type of distress and specifics of help requested.  
**D. All of the above.**  

A radiotelephone distress call must include who you are (call sign or vessel name), where you are, the nature of the distress, and the kind of help you need. The answer is all of these.

- [47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314): “The call sign (or name, if no call sign assigned) of the mobile station in distress, spoken three times;”
- [47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314): “Particulars of the station's position;”
- [47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314): “The nature of the distress;”
- [47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314): “The kind of assistance desired; and”

### 1-10B2

What are the highest priority communications from ships at sea?

A. All critical message traffic authorized by the ship’s master.  
B. Navigation and meteorological warnings.  
**C. Distress calls are highest and then communications preceded by Urgency and then Safety signals.**  
D. Authorized government communications for which priority right has been claimed.  

Distress has absolute priority, followed by urgency (PAN PAN), then safety (SECURITE), then all other traffic.

- [47 CFR §80.312](https://www.ecfr.gov/current/title-47/section-80.312): “The distress call has absolute priority over all other transmissions.”
- [47 CFR §80.327](https://www.ecfr.gov/current/title-47/section-80.327): “The urgency signal has priority over all other communications except distress.”

### 1-10B3

What is a Distress communication?

A. Communications indicating that the calling station has a very urgent message concerning safety.  
**B. An internationally recognized communication indicating that the sender is threatened by grave and imminent danger and requests immediate assistance.**  
C. Radio communications which, if delayed, will adversely affect the safety of life or property.  
D. An official radio communication notification of approaching navigational or meteorological hazards.  

A distress signal means a station is threatened by grave and imminent danger and requests immediate assistance. A very urgent message about safety is an urgency call, and navigation or weather warnings are safety messages.

- [47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314): “These distress signals indicate that a mobile station is threatened by grave and imminent danger and requests immediate assistance.”

### 1-10B4

What is the order of priority of radiotelephone communications in the maritime services?

A. Alarm and health and welfare communications.  
B. Navigation hazards, meteorological warnings, priority traffic.  
**C. Distress calls and signals, followed by communications preceded by Urgency and Safety signals and all other communications.**  
D. Government precedence, messages concerning safety of life and protection of property, and traffic concerning grave and imminent danger.  

Maritime communications follow a fixed priority order: distress first, then urgency, then safety, then all other communications.

- [47 CFR §80.91](https://www.ecfr.gov/current/title-47/section-80.91): “Distress calls, distress messages, and distress traffic.”
- [47 CFR §80.91](https://www.ecfr.gov/current/title-47/section-80.91): “Other communications.”

### 1-10B5

The radiotelephone Distress call and message consists of:

A. MAYDAY spoken three times, followed by the name of the vessel and the call sign in phonetics spoken three times.  
B. Particulars of its position, latitude and longitude, and other information which might facilitate rescue, such as length, color and type of vessel, and number of persons on board.  
C. Nature of distress and kind of assistance required.  
**D. All of the above.**  

The radiotelephone distress call is MAYDAY spoken three times, "this is," and the vessel's call sign or name spoken three times. It then gives the position, the nature of the distress, the help needed, and anything else that would help rescuers, such as the vessel's length, color and type and how many people are aboard. Every choice is part of it.

- [47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314): “The distress signal MAYDAY spoken three times;”
- [47 CFR §80.314](https://www.ecfr.gov/current/title-47/section-80.314): “Any other information which might facilitate rescue, for example, the length, color, and type of vessel, or number of persons on board.”

### 1-10B6

What is Distress traffic?

**A. All messages relative to the immediate assistance required by a ship, aircraft or other vehicle threatened by grave or imminent danger, such as life and safety of persons on board, or man overboard.**  
B. In radiotelephony, the speaking of the word, “Mayday.”  
C. Health and welfare messages concerning property and the safety of a vessel.  
D. Internationally recognized communications relating to important situations.  

Distress traffic is all of the messages about the immediate help needed by a person, ship, aircraft or other vehicle in distress. That includes search and rescue and on-scene communications. The word "Mayday" by itself is the distress signal, not the traffic.

- [47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5): “Distress traffic consists of all messages relating to the immediate assistance required by a person, ship, aircraft, or other vehicle in distress, including search and rescue communications and on-scene communications.”

## Topic 11. Urgency and Safety Communications

PAN PAN (urgency) and SECURITE (safety): the two levels below distress.

- Urgency (PAN PAN ×3): a very urgent message about the safety of a vessel or person. ([47 CFR §80.327](https://www.ecfr.gov/current/title-47/section-80.327))
- Urgency outranks everything except distress, and needs the master's authority. ([47 CFR §80.327](https://www.ecfr.gov/current/title-47/section-80.327))
- Safety (SECURITE ×3): navigation and weather warnings. ([47 CFR §80.329](https://www.ecfr.gov/current/title-47/section-80.329))

### 1-11B1

What is a typical Urgency transmission?

**A. A request for medical assistance that does not rise to the level of a Distress or a critical weather transmission higher than Safety.**  
B. A radio Distress transmission affecting the security of humans or property.  
C. Health and welfare traffic which impacts the protection of on-board personnel.  
D. A communications alert that important personal messages must be transmitted.  

The urgency signal (PAN PAN) is for a very urgent message about the safety of a ship, aircraft, vehicle or person, short of grave and imminent danger. A request for medical help that isn't a life-or-death emergency is the classic example. A grave and imminent threat would be distress (MAYDAY), and a weather or navigation warning would be safety (SECURITE).

- [47 CFR §80.327](https://www.ecfr.gov/current/title-47/section-80.327): “The urgency signal indicates that the calling station has a very urgent message to transmit concerning the safety of a ship, aircraft, or other vehicle, or the safety of a person.”

### 1-11B2

What is the internationally recognized Urgency signal?

A. The letters “TTT” transmitted three times by radiotelegraphy.  
**B. The words “PAN PAN” spoken three times before the Urgency call.**  
C. Three oral repetitions of the word “Safety” sent before the call.  
D. The pronouncement of the word “Mayday.”  

In radiotelephony, the urgency signal is PAN PAN said three times before the call. (TTT is the radiotelegraph safety signal, and MAYDAY is the distress signal.)

- [47 CFR §80.327](https://www.ecfr.gov/current/title-47/section-80.327): “In radiotelephony, the urgency signal consists of three oral repetitions of the group of words PAN PAN transmitted before the call.”

### 1-11B3

What is a Safety transmission?

**A. A communications transmission which indicates that a station is preparing to transmit an important navigation or weather warning.**  
B. A radiotelephony warning preceded by the words “PAN PAN.”  
C. Health and welfare traffic concerning the protection of human life.  
D. A voice call proceeded by the words “Safety Alert.”  

The safety signal means a station is about to send a message about the safety of navigation or an important weather warning. In radiotelephony, it's the word SECURITE.

- [47 CFR §80.329](https://www.ecfr.gov/current/title-47/section-80.329): “The safety signal indicates that the station is about to transmit a message concerning the safety of navigation or giving important meteorological warnings.”

### 1-11B4

The Urgency signal concerning the safety of a ship, aircraft or person shall be sent only on the authority of:

A. Master of ship.  
B. Person responsible for mobile station.  
**C. Either Master of ship or person responsible for mobile station.**  
D. An FCC-licensed operator.  

Like a distress call, the urgency signal may be sent only on the authority of the master or the person responsible for the mobile station. Either one can authorize it.

- [47 CFR §80.327](https://www.ecfr.gov/current/title-47/section-80.327): “The urgency signal must be sent only on the authority of the master or person responsible for the mobile station.”

### 1-11B5

The Urgency signal has lower priority than:

A. Ship-to-ship routine calls.  
**B. Distress.**  
C. Safety.  
D. Security.  

Urgency has priority over all other communications except distress.

- [47 CFR §80.327](https://www.ecfr.gov/current/title-47/section-80.327): “The urgency signal has priority over all other communications except distress.”

### 1-11B6

What safety signal call word is spoken three times, followed by the station call letters spoken three times, to announce a storm warning, danger to navigation, or special aid to navigation?

A. PAN PAN.  
B. MAYDAY.  
C. SAFETY.  
**D. SECURITE.**  

The radiotelephone safety signal is SECURITE, pronounced as in French and spoken three times before the call. It is used for warnings about weather, ice, wrecks and other dangers to navigation.

- [47 CFR §80.329](https://www.ecfr.gov/current/title-47/section-80.329): “In radiotelephony, the safety signal consists of the word SECURITE, pronounced as in French, spoken three times and transmitted before the call.”
- [47 CFR §80.329](https://www.ecfr.gov/current/title-47/section-80.329): “Messages about meteorological warnings, of cyclones, dangerous ice, dangerous wrecks, or any other imminent danger to marine navigation must be preceded by the safety signal.”

## Topic 12. GMDSS

The Global Maritime Distress and Safety System links ships in distress with rescue authorities ashore and with nearby ships.

- GMDSS moves distress messages quickly to whoever can best help. ([47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5))
- It applies to all passenger ships and to cargo ships of 300 gross tons and up. ([47 CFR §80.1065](https://www.ecfr.gov/current/title-47/section-80.1065))
- Alerts go ship-to-shore (to rescue centers) and ship-to-ship (to nearby vessels). ([47 CFR §80.1113](https://www.ecfr.gov/current/title-47/section-80.1113))
- Every ship must be able to perform the core communication functions itself. ([47 CFR §80.1081](https://www.ecfr.gov/current/title-47/section-80.1081))

### 1-12B1

What is the fundamental concept of the GMDSS?

A. It is intended to automate and improve existing digital selective calling procedures and techniques.  
B. It is intended to provide more effective but lower cost commercial communications.  
C. It is intended to provide compulsory vessels with a collision avoidance system when they are operating in waters that are also occupied by non-compulsory vessels.  
**D. It is intended to automate and improve emergency communications in the maritime industry.**  

The GMDSS is an IMO system for getting distress messages quickly from a vessel in distress to whoever can best help. It does this with standardized equipment and procedures at short, medium and long range, and automates and improves emergency communications at sea. It isn't a cost-saving commercial system or a collision-avoidance system.

- [47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5): “designed to provide the rapid transfer of distress messages from vessels in distress to units best suited for giving or coordinating assistance”

### 1-12B2

The primary purpose of the GMDSS is to:

A. Allow more effective control of SAR situations by vessels.  
B. Provide additional shipboard systems for more effective company communications.  
**C. Automate and improve emergency communications for the world’s shipping industry.**  
D. Provide effective and inexpensive communications.  

The GMDSS exists to improve emergency (distress and safety) communications for shipping worldwide. It moves distress messages quickly to the units best able to help, using standardized equipment and procedures.

- [47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5): “An International Maritime Organization (IMO) worldwide coordinated maritime distress system designed to provide the rapid transfer of distress messages from vessels in distress to units best suited for giving or coordinating assistance.”

### 1-12B3

What is the basic concept of GMDSS?

A. Shoreside authorities and vessels can assist in a coordinated SAR operation with minimum delay.  
B. Search and rescue authorities ashore can be alerted to a Distress situation.  
C. Shipping in the immediate vicinity of a ship in Distress will be rapidly alerted.  
**D. All of these.**  

The GMDSS links shore-based search and rescue authorities with ships near a vessel in distress. Distress alerts go ship-to-shore to rescue coordination centers and ship-to-ship to nearby vessels, and shore stations can relay alerts back out to ships. So all three choices are part of the basic concept.

- [47 CFR §80.1113](https://www.ecfr.gov/current/title-47/section-80.1113): “Ship-to-shore distress alerts are used to alert Rescue Coordination Centers via coast stations or coast earth stations that a ship is in distress.”
- [47 CFR §80.1113](https://www.ecfr.gov/current/title-47/section-80.1113): “Ship-to-ship distress alerts are used to alert other ships in the vicinity of the ship in distress”

### 1-12B4

GMDSS is primarily a system based on?

A. Ship-to-ship Distress communications using MF or HF radiotelephony.  
B. VHF digital selective calling from ship to shore.  
C. Distress, Urgency and Safety communications carried out by the use of narrow-band direct printing telegraphy.  
**D. The linking of search and rescue authorities ashore with shipping in the immediate vicinity of a ship in Distress or in need of assistance.**  

The core idea of the GMDSS is connecting search and rescue authorities ashore with the ships near a vessel in distress, so both can respond quickly. Radiotelephony, VHF DSC and NBDP are just some of the tools it uses.

- [47 CFR §80.1113](https://www.ecfr.gov/current/title-47/section-80.1113): “Shore-to-ship distress alert relays are used by a station or Rescue Coordination Center to relay information about a ship in distress to, as appropriate, all ships, a selected group of ships, or a specific ship”

### 1-12B5

What is the responsibility of vessels under GMDSS?

A. Vessels over 300 gross tons may be required to render assistance if such assistance does not adversely affect their port schedule.  
B. Only that vessel, regardless of size, closest to a vessel in Distress, is required to render assistance.  
**C. Every ship is able to perform those communications functions that are essential for the Safety of the ship itself and of other ships.**  
D. Vessels operating under GMDSS, outside of areas effectively serviced by shoreside authorities, operating in sea areas A2, and A4 may be required to render assistance in Distress situations.  

Every GMDSS ship must be able to perform the essential communication functions on its own. These include sending and receiving distress alerts, search and rescue and on-scene communications, and receiving maritime safety information. That way it can look after its own safety and help other ships.

- [47 CFR §80.1081](https://www.ecfr.gov/current/title-47/section-80.1081): “Ships, while at sea, must be capable:”
- [47 CFR §80.1081](https://www.ecfr.gov/current/title-47/section-80.1081): “Of transmitting and receiving ship-to-ship distress alerts;”

### 1-12B6

GMDSS is required for which of the following?

A. All vessels capable of international voyages.  
**B. SOLAS Convention ships of 300 gross tonnage or more.**  
C. Vessels operating outside of the range of VHF coastal radio stations.  
D. Coastal vessels of less than 300 gross tons.  

The GMDSS rules apply to all passenger ships regardless of size and to cargo ships of 300 gross tons and up, which are the ships covered by the SOLAS Convention.

- [47 CFR §80.1065](https://www.ecfr.gov/current/title-47/section-80.1065): “The regulations contained within this subpart apply to all passenger ships regardless of size and cargo ships of 300 tons gross tonnage and upwards.”

## Topic 13. VHF Equipment Controls

The controls on a marine VHF radio and why they exist.

- VHF sets must be able to drop to 1 watt. ([47 CFR §80.215](https://www.ecfr.gov/current/title-47/section-80.215))
- An "A" channel is the U.S. simplex use of an international duplex channel, which is what INT/USA switches. ([47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373))
- VHF sets must have a squelch control. Set it just high enough to quiet the noise. ([47 CFR §80.877](https://www.ecfr.gov/current/title-47/section-80.877))

### 1-13C1

What is the purpose of the INT-USA control settings on a VHF?

A. To change all VTS frequencies to Duplex so all vessels can receive maneuvering orders.  
B. To change all VHF channels from Duplex to Simplex while in U.S. waters.  
**C. To change certain International Duplex channel assignments to simplex in the U.S. for VTS and other purposes.**  
D. To change to NOAA weather channels and receive weather broadcasts while in the U.S.  

Some internationally duplex VHF channels are used in the U.S. as simplex channels, where both stations transmit on the ship frequency. This is shown by an "A" after the channel number, as in 22A. The INT/USA switch picks the U.S. simplex version or the international duplex version of those channels.

- [47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373): “the letter “A” following the channel designator indicates simplex operation on a channel designated internationally as a duplex channel.”

### 1-13C2

VHF ship station transmitters must have the capability of reducing carrier power to:

**A. 1 watt.**  
B. 10 watts.  
C. 25 watts.  
D. 50 watts.  

Ship VHF transmitters must be able to drop their carrier power to 1 watt or less. Low power is the norm for short-range traffic like bridge-to-bridge calls.

- [47 CFR §80.215](https://www.ecfr.gov/current/title-47/section-80.215): “All transmitters and remote control units must be capable of reducing the carrier power to one watt or less;”

### 1-13C3

The Dual Watch (DW) function is used to:

A. Listen to Ch-70 at the same time while monitoring Ch-16.  
B. Sequentially monitor 4 different channels.  
C. Sequentially monitoring all VHF channels.  
**D. Listen on any selected channel while periodically monitoring Ch-16.**  

Dual watch lets you listen on a working channel while the radio checks Channel 16 every second or so, so you don't miss a distress call. It only toggles between your channel and 16. Scanning several channels is a different function.

_General operating practice, not a quoted rule._


### 1-13C4

Which of the following statements best describes the correct setting for manual adjustment of the squelch control?

**A. Adjust squelch control to the minimum level necessary to barely suppress any background noise.**  
B. Always adjust squelch control to its maximum level.  
C. Always adjust squelch control to its minimum level.  
D. Adjust squelch control to approximately twice the minimum level necessary to barely suppress any background noise.  

Squelch mutes the receiver when no signal is present. If it's set too high, weak signals (possibly a distant distress call) get muted too. The right setting is the lowest level that just silences the background noise. Part 80 requires a squelch control on VHF sets.

_General operating practice, not a quoted rule._

- [47 CFR §80.877](https://www.ecfr.gov/current/title-47/section-80.877): “The receiver must have a manual volume control and a squelch control.”

### 1-13C5

The “Scan” function is used to:

A. Monitor Ch-16 continuously and switching to either Ch-70 or Ch-13 every 5 seconds.  
B. Scan Ch-16 for Distress calls.  
C. Scan Ch-70 for Distress alerts.  
**D. Sequentially scan all or selected channels.**  

Scan steps the receiver through all channels, or a selected set, stopping when it hears activity. That's different from dual watch, which only alternates between one channel and Channel 16.

_General operating practice, not a quoted rule._


### 1-13C6

Why must all VHF Distress, Urgency and Safety communications (as well as VTS traffic calls) be performed in Simplex operating mode?

A. To minimize interference from vessels engaged in routine communications.  
**B. To ensure that vessels not directly participating in the communications can hear both sides of the radio exchange.**  
C. To enable an RCC or Coast station to only hear communications from the vessel actually in distress.  
D. To allow an RCC or Coast station to determine which transmissions are from other vessels and which transmissions are from the vessel actually in distress.  

On a simplex channel, everyone transmits and receives on the same frequency, so every station in range hears both sides of the conversation. For distress, urgency, safety and VTS traffic, nearby ships need to hear the whole exchange to help or stay clear. Channel 16 is a single-frequency channel: ship and coast stations both use 156.800 MHz.

_General operating practice, not a quoted rule._

- [47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373): “16 156.800 156.800”

## Topic 14. VHF Channel Selection

Which VHF channel is used for what.

- Channel 16: distress, safety and calling. ([47 CFR §80.148](https://www.ecfr.gov/current/title-47/section-80.148))
- Channel 70: DSC only. ([47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373))
- Channel 13: bridge-to-bridge. ([33 CFR §26.04](https://www.ecfr.gov/current/title-33/section-26.04))
- Channel 08: commercial intership. ([47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373))
- 121.5 MHz (AM): aeronautical emergency frequency. ([47 CFR §87.187](https://www.ecfr.gov/current/title-47/section-87.187))

### 1-14C1

What channel must VHF-FM-equipped vessels monitor at all times when the vessel is at sea?

A. Channel 8.  
**B. Channel 16.**  
C. Channel 5A.  
D. Channel 1A.  

Channel 16 (156.800 MHz) is the VHF distress, safety and calling channel, and compulsory vessels must monitor it while underway.

- [47 CFR §80.148](https://www.ecfr.gov/current/title-47/section-80.148): “Each compulsory vessel, while underway, must maintain a watch for radiotelephone distress calls on 156.800 MHz”

### 1-14C2

What is the aircraft frequency and emission used for distress communications?

A. 243.000 MHz - F3E.  
B. 121.500 MHz - F3E.  
C. 156.525 MHz - F1B.  
**D. 121.500 MHz - A3E.**  

121.500 MHz is the aeronautical emergency and distress frequency, and it uses A3E, which is AM voice. Aviation stays on AM, unlike marine VHF, which is FM (F3E).

- [47 CFR §87.187](https://www.ecfr.gov/current/title-47/section-87.187): “The frequencies 121.500 MHz and 243.000 MHz are emergency and distress frequences available for use by survival craft stations, emergency locator transmitters and equipment used for survival pruposes.”
- [47 CFR §80.355](https://www.ecfr.gov/current/title-47/section-80.355): “EPIRB stations may be assigned 121.500 MHz and 243 MHz using A3E”

### 1-14C3

Which VHF channel is used only for digital selective calling?

**A. Channel 70.**  
B. Channel 16.  
C. Channel 22A.  
D. Channel 6.  

Channel 70 (156.525 MHz) is reserved for digital selective calling. Voice isn't allowed on it. GMDSS ships keep a dedicated, non-scanning watch on it.

- [47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373): “Digital Selective Calling 70 15 156.525 156.525”
- [47 CFR §80.1085](https://www.ecfr.gov/current/title-47/section-80.1085): “A dedicated, non-scanning radio installation capable of maintaining a continuous DSC watch on VHF channel 70”

### 1-14C4

Which channel is utilized for the required bridge-to-bridge watch?

A. DSC on Ch-70.  
B. VHF-FM on Ch-16.  
**C. VHF-FM on Ch-13 in most areas of the continental United States.**  
D. The vessel’s VHF working frequency.  

On U.S. navigable waters, the designated bridge-to-bridge channel is Channel 13 (156.65 MHz). Channel 67 is used instead in one specific area.

- [33 CFR §26.04](https://www.ecfr.gov/current/title-33/section-26.04): “On the navigable waters of the United States, channel 13 (156.65 MHz) is the designated frequency required to be monitored in accordance with § 26.05(a) except that in the area prescribed in § 26.03(e), channel 67 (156.375 MHz) is the designated frequency.”

### 1-14C5

Which channel would most likely be used for routine ship-to-ship voice traffic?

A. Ch-16.  
**B. Ch-08.**  
C. Ch-70.  
D. Ch-22A.  

Channel 08 (156.400 MHz) is a commercial intership-only channel, which makes it the typical choice for routine ship-to-ship traffic. Channel 16 is for distress and calling, Channel 70 is DSC only, and 22A is the Coast Guard liaison channel.

- [47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373): “08 156.400 Do.”

### 1-14C6

What channel would you use to place a call to a shore telephone?

A. Ch-16.  
B. Ch-70.  
**C. Ch-28.**  
D. Ch-06.  

Calls to shore telephones go through a public coast station on a public correspondence channel. Channel 28 is one of these duplex channel pairs: the ship transmits on 157.400 MHz and the coast station transmits on 162.000 MHz.

- [47 CFR §80.371](https://www.ecfr.gov/current/title-47/section-80.371): “Working frequencies in the marine VHF 156-162 MHz band. (1)(i) The frequency pairs listed in this paragraph are available for assignment to public coast stations for communications with ship stations and units on land.”
- [47 CFR §80.371](https://www.ecfr.gov/current/title-47/section-80.371): “28 157.400”

## Topic 15. MF-HF Equipment Controls

Setting up an MF/HF transceiver for voice and telex.

- J3E is single-sideband voice: the E stands for telephony. ([47 CFR §2.201](https://www.ecfr.gov/current/title-47/section-2.201))
- Radiotelex is F1B or J2B: the B means telegraphy for automatic reception. ([47 CFR §2.201](https://www.ecfr.gov/current/title-47/section-2.201))
- Channels are shared, so use only the power you need. ([47 CFR §80.87](https://www.ecfr.gov/current/title-47/section-80.87))

### 1-15C1

Which modes could be selected to receive vessel traffic lists from high seas shore stations?

A. AM and VHF-FM.  
B. ARQ and FEC.  
C. VHF-FM and SSB.  
**D. SSB and FEC.**  

High-seas coast stations send traffic lists by voice on single sideband (SSB) and by radiotelex in FEC mode. FEC is the one-way broadcast mode of narrow-band direct printing, so any number of ships can copy it. ARQ is a two-way, one-to-one mode, and VHF-FM doesn't reach the high seas.

_General operating practice, not a quoted rule._


### 1-15C2

Why must all MF-HF Distress, Urgency and Safety communications take place solely on the 6 assigned frequencies and in the simplex operating mode?

A. For non-GMDSS ships, to maximize the chances for other vessels to receive those communications.  
**B. Answers a) and c) are both correct.**  
C. For GMDSS or DSC-equipped ships, to maximize the chances for other vessels to receive those communications following the transmission of a DSC call of the correct priority.  
D. To enable an RCC or Coast station to only hear communications from the vessel actually in distress.  

Distress, urgency and safety traffic stays on the designated distress frequencies in simplex mode so that every station listening hears it. For ships without DSC, that means anyone monitoring the frequency. For DSC ships, it means everyone who just received the DSC call and switched to the matching voice frequency. That's why a) and c) are both correct. Being heard only by the rescue center would defeat the purpose.

_General operating practice, not a quoted rule._

- [47 CFR §80.369](https://www.ecfr.gov/current/title-47/section-80.369): “may be used by coast and ship stations on a simplex basis for distress and safety communications”

### 1-15C3

To set-up the MF/HF transceiver for a voice call to a coast station, the operator must:

A. Select J3E mode for proper SITOR operations.  
B. Select F1B mode or J2B mode, depending on the equipment manufacturer.  
**C. Select J3E mode for proper voice operations.**  
D. Select F1B/J2B modes or J3E mode, depending on whether FEC or ARQ is preferred.  

J3E is single-sideband, suppressed-carrier telephony (voice), the standard mode for MF/HF voice calls. In the emission code, J means single sideband with suppressed carrier, 3 means a single analog channel, and E means telephony. F1B and J2B are telegraphy (telex) modes.

- [47 CFR §2.201](https://www.ecfr.gov/current/title-47/section-2.201): “Telephony (including sound broadcasting) E”

### 1-15C4

MF/HF transceiver power levels should be set:

**A. To the lowest level necessary for effective communications.**  
B. To the level necessary to maximize the propagation radius.  
C. To the highest level possible so as to ensure other stations cannot “break-in” on the channel during use.  
D. Both a) and c) are correct.  

Good practice is to use only as much power as you need. More power only adds interference to other stations sharing the band, and it can't stop others from "breaking in." Channels are shared, and Part 80 requires licensees to minimize interference.

_General operating practice, not a quoted rule._

- [47 CFR §80.87](https://www.ecfr.gov/current/title-47/section-80.87): “Station licensees must cooperate in the use of their respective frequency assignments in order to minimize interference”

### 1-15C5

To set-up the MF/HF transceiver for a TELEX call to a coast station, the operator must:

A. Select J3E mode for proper SITOR operations.  
**B. Select F1B mode or J2B mode, depending on the equipment manufacturer.**  
C. Select F1B/J2B modes or J3E mode, depending on whether ARQ or FEC is preferred.  
D. None of the above.  

Radiotelex (SITOR/NBDP) is telegraphy for automatic reception, the "B" in the emission code. Depending on the manufacturer, a radio produces it as F1B (direct frequency-shift keying) or J2B (single sideband with an audio tone). J3E is voice.

- [47 CFR §2.201](https://www.ecfr.gov/current/title-47/section-2.201): “Telegraphy—for automatic reception B”

### 1-15C6

What is the purpose of the Receiver Incremental Tuning (RIT) or “Clarifier” control?

**A. It acts as a “fine-tune” control on the receive frequency.**  
B. It acts as a “fine-tune” control on the transmitted frequency.  
C. It acts as a “fine-tune” control on both the receive and transmitted frequencies.  
D. None of the above.  

The clarifier, or Receiver Incremental Tuning (RIT), shifts only the receive frequency slightly so you can make a mistuned single-sideband voice sound natural. Your transmit frequency stays where it is.

_General operating practice, not a quoted rule._


## Topic 16. MF-HF Frequency & Emission Selection

MF/HF frequencies, channel numbers and emissions.

- 2182 kHz is the MF voice distress and calling frequency. ([47 CFR §80.369](https://www.ecfr.gov/current/title-47/section-80.369))
- Ships use J3E on 2182 kHz. ([47 CFR §80.143](https://www.ecfr.gov/current/title-47/section-80.143))
- Paired (duplex) frequencies go with public coast stations. ([47 CFR §80.371](https://www.ecfr.gov/current/title-47/section-80.371))
- HF channel numbers are band + channel (401 = channel 1 in the 4 MHz band). ([47 CFR §80.371](https://www.ecfr.gov/current/title-47/section-80.371))

### 1-16C1

On what frequency would a vessel normally call another ship station when using a radiotelephony emission?

A. Only on 2182 kHz in ITU Region 2.  
**B. On 2182 kHz or Ch-16, unless the station knows that the called vessel maintains a simultaneous watch on another intership working frequency.**  
C. On the appropriate calling channel of the ship station at 15 minutes past the hour.  
D. On the vessel’s unique working radio channel assigned by the Federal Communications Commission.  

Ships normally call other ships on 2182 kHz (or Channel 16 on VHF), then move to a working frequency. You can call directly on an intership working frequency only when you know the other ship is also watching it.

- [47 CFR §80.116](https://www.ecfr.gov/current/title-47/section-80.116): “must first establish communications with other ship stations by call and reply on 2182 kHz. Calls may be initiated on an intership working frequency when it is known that the called vessel maintains a simultaneous watch on the working frequency and on 2182 kHz.”

### 1-16C2

What is the MF radiotelephony calling and Distress frequency?

A. 2670 kHz.  
B. Ch-06 VHF.  
**C. 2182 kHz.**  
D. Ch-22 VHF.  

2182 kHz is the international MF radiotelephone distress, urgency and safety frequency, and it's also the MF calling frequency.

- [47 CFR §80.369](https://www.ecfr.gov/current/title-47/section-80.369): “the frequency 2182 is an international radiotelephony distress, urgency and safety frequency for ship stations, public and private coast stations, and survival craft stations. It is also used for call and reply”

### 1-16C3

For general communications purposes, paired frequencies are:

A. Normally used with private coast stations.  
B. Normally used between ship stations.  
C. Normally used between private coast and ship stations.  
**D. Normally used with public coast stations.**  

Paired (duplex) frequencies are mainly used with public coast stations: the ship transmits on one frequency and the coast station on the other, so you can talk like on a telephone. Part 80's public correspondence rules assign these frequency pairs to public coast stations.

- [47 CFR §80.371](https://www.ecfr.gov/current/title-47/section-80.371): “The frequency pairs listed in this paragraph are available for assignment to public coast stations for communications with ship stations and units on land.”

### 1-16C4

What emission must be used when operating on the MF distress and calling voice frequency?

**A. J3E – Single sideband telephony.**  
B. A1A – On-off keying without modulation by an audio frequency.  
C. F3E – Frequency modulation telephony.  
D. A3E – Amplitude modulation telephony, double sideband.  

On 2182 kHz, ships transmit J3E, which is single-sideband suppressed-carrier telephony. The rules allow H3E for talking with foreign stations, and A3E only for survival craft or very old equipment.

- [47 CFR §80.143](https://www.ecfr.gov/current/title-47/section-80.143): “must be able to receive and transmit J3E emission on the frequency 2182 kHz”

### 1-16C5

Which of the following defines high frequency “ITU Channel 1212”?

A. Ch-12 in the 16 MHz band.  
B. Ch-1216 in the MF band.  
**C. The 12th channel in the 12 MHz band.**  
D. This would indicate the 1st channel in the 12 MHz band.  

HF maritime channel numbers combine the band and the channel: the first digits give the band in MHz and the last two give the channel number. For example, Part 80's table lists channel 401 at 4065 kHz in the 4 MHz band. So 1212 is channel 12 in the 12 MHz band.

- [47 CFR §80.371](https://www.ecfr.gov/current/title-47/section-80.371): “401 4065 4357”

### 1-16C6

For general communications purposes, simplex frequencies are:

A. Normally used between ship stations and private coast stations.  
B. Normally used with public coast stations.  
C. Normally used between ship stations.  
**D. Both a) and c) are correct.**  

Simplex frequencies, where both stations use the same frequency, are used for intership traffic and for traffic between ships and private coast stations. Public coast stations normally use paired frequencies, so the answer is "a) and c)."

- [47 CFR §80.373](https://www.ecfr.gov/current/title-47/section-80.373): “available for assignment for intership safety and operational simplex radiotelephone communications”

## Topic 17. Equipment Tests

How and when to test radio equipment without interfering.

- Announce your call sign and "test" on the test channel. ([47 CFR §80.101](https://www.ecfr.gov/current/title-47/section-80.101))
- Tests last 10 seconds max, and at least 5 minutes apart on 2182 or Channel 16. ([47 CFR §80.101](https://www.ecfr.gov/current/title-47/section-80.101))
- GMDSS equipment is tested and logged daily. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))

### 1-17C1

What is the proper procedure for testing a radiotelephone installation?

A. A dummy antenna must be used to insure the test will not interfere with ongoing communications.  
**B. Transmit the station’s call sign, followed by the word “test” on the frequency being used for the test.**  
C. Permission for the voice test must be requested and received from the nearest public coast station.  
D. Short tests must be confined to a single frequency and must never be conducted in port.  

Before a test transmission, the station must announce its call sign followed by the word "test" on the channel being tested. It must also make sure it isn't interfering with traffic already in progress.

- [47 CFR §80.101](https://www.ecfr.gov/current/title-47/section-80.101): “The testing station's call sign, followed by the word “test”, must be announced on the radio-channel being used for the test.”

### 1-17C2

When testing is conducted on 2182 kHz or Ch-16, testing should not continue for more than ______ in any 5-minute period.

A. 2 minutes.  
B. 1 minute.  
C. 30 seconds.  
**D. 10 seconds.**  

Test signals can't last more than 10 seconds or repeat within one minute, and on 2182 kHz or Channel 16 they must be at least five minutes apart. So no test may run more than 10 seconds in any 5-minute period.

- [47 CFR §80.101](https://www.ecfr.gov/current/title-47/section-80.101): “Test signals must not exceed ten seconds”
- [47 CFR §80.101](https://www.ecfr.gov/current/title-47/section-80.101): “On the frequency 2182 kHz or 156.800 MHz, the time between tests must be a minimum of five minutes.”

### 1-17C3

Under GMDSS, a compulsory VHF-DSC radiotelephone installation must be tested at what minimum intervals at sea?

**A. Daily.**  
B. Annually, by a representative of the FCC.  
C. Weekly.  
D. Monthly.  

Ship logs must record daily tests confirming that the GMDSS equipment, including the VHF-DSC radiotelephone, is working, along with a daily statement about the radiotelephone equipment.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “Daily entries of satisfactory tests to ensure the continued proper functioning of GMDSS equipment shall be made.”

### 1-17C4

The best way to test the MF-HF NBDP system is?

A. Make a radiotelephone call to a coast station.  
B. Initiate an ARQ call to demonstrate that the transmitter and antenna are working.  
C. Initiate an FEC call to demonstrate that the transmitter and antenna are working.  
**D. Initiate an ARQ call to a Coast Station and wait for the automatic exchange of answerbacks.**  

In ARQ mode, the two stations exchange answerbacks automatically before any text goes through. Getting the coast station's answerback proves your NBDP transmitter, receiver and antenna all work. An FEC broadcast is one-way, so it doesn't confirm anything was received.

_General operating practice, not a quoted rule._


### 1-17C5

The best way to test the Inmarsat-C terminal is?

**A. Compose and send a brief message to your own Inmarsat-C terminal.**  
B. Send a message to a shore terminal and wait for confirmation.  
C. Send a message to another ship terminal.  
D. If the “Send” light flashes, proper operation has been confirmed.  

Sending a short message to your own Inmarsat-C terminal tests the whole path: your terminal sends it up through the satellite to the land earth station, and it comes back down to you. When it arrives, you know both transmitting and receiving work. A blinking "send" light proves nothing about the link.

_General operating practice, not a quoted rule._


### 1-17C6

When may you test a radiotelephone transmitter on the air?

A. Between midnight and 6:00 AM local time.  
B. Only when authorized by the Commission.  
**C. At any time (except during silent periods) as necessary to assure proper operation.**  
D. After reducing transmitter power to 1 watt.  

Part 80 allows test transmissions whenever they're needed to make sure the equipment works, as long as you follow the testing procedure: no interfering with traffic, announce your call sign and "test," and keep it short. You may not test during the 2182 kHz silence periods, which are reserved for distress, urgency and safety traffic.

- [47 CFR §80.101](https://www.ecfr.gov/current/title-47/section-80.101): “The operator must not interfere with transmissions in progress.”
- [47 CFR §80.304](https://www.ecfr.gov/current/title-47/section-80.304): “Except for distress, urgency or safety messages, ship stations must not transmit during the silence periods on 2182 kHz.”

## Topic 18. Equipment Faults

What to do when equipment misbehaves.

- Stop transmitting until a malfunction is fixed (except for immediate safety of life or property). ([47 CFR §80.90](https://www.ecfr.gov/current/title-47/section-80.90))
- Tell the master about faulty radiotelephone equipment, and log it. ([47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409))

### 1-18C1

Under normal circumstances, what do you do if the transmitter aboard your ship is operating off-frequency, overmodulating or distorting?

A. Reduce to low power.  
B. Reduce audio volume level.  
**C. Stop transmitting.**  
D. Make a notation in station operating log.  

If a transmitter malfunctions, for example by going off frequency or distorting, you must stop transmitting until it's fixed. The one exception is a transmission about the immediate safety of life or property.

- [47 CFR §80.90](https://www.ecfr.gov/current/title-47/section-80.90): “Transmission must be suspended immediately upon detection of a transmitter malfunction and must remain suspended until the malfunction is corrected”

### 1-18C2

Which would be an indication of proper operation of a SSB transmitter rated at 60 watt PEP output?

A. In SSB (J3E) voice mode, with the transmitter keyed but without speaking into the microphone, power output is indicated.  
**B. In SITOR communications, the power meter can be seen fluctuating regularly from zero to the 60 watt relative output reading.**  
C. In SSB (J3E) mode, speaking into the microphone causes power meter to fluctuate slightly around the 60 watt reading.  
D. A steady indication of transmitted energy on an RF Power meter with no fluctuations when speaking into the microphone.  

SITOR (radiotelex) in ARQ mode sends in short bursts and then listens, so the power meter swings from zero up to the full output reading over and over. That's normal. In J3E voice mode, by contrast, a working transmitter shows output only while you speak, so steady power with no speech, or no change when you speak, would point to a fault.

_General operating practice, not a quoted rule._


### 1-18C3

If a ship radio transmitter signal becomes distorted:

A. Reduce transmitter power.  
B. Use minimum modulation.  
**C. Cease operations.**  
D. Reduce audio amplitude.  

A distorted signal is a transmitter malfunction, and the rule is to stop transmitting until it's fixed. Turning down power or audio doesn't fix the fault. The only exception is a transmission about the immediate safety of life or property.

- [47 CFR §80.90](https://www.ecfr.gov/current/title-47/section-80.90): “Transmission must be suspended immediately upon detection of a transmitter malfunction and must remain suspended until the malfunction is corrected”

### 1-18C4

What would be an indication of a malfunction on a GMDSS station with a 24 VDC battery system?

**A. A constant 30 volt reading on the GMDSS console voltmeter.**  
B. After testing the station on battery power, the ammeter reading indicates a high rate of charge that then declines.  
C. After testing the station on battery power, a voltmeter reading of 30 volts for brief period followed by a steady 26 volt reading.  
D. None of the above.  

A 24-volt battery bank reads several volts above 24 while charging, and the reading settles back when charging ends. A voltage stuck at 30 volts means the charger isn't regulating, which overcharges and damages the batteries. The other choices describe normal behavior after the batteries have powered the station during a test.

_General operating practice, not a quoted rule._


### 1-18C5

Your antenna tuner becomes totally inoperative. What would you do to obtain operation on both the 8 MHz and 22 MHz frequency bands?

A. Without an operating antenna tuner, transmission is impossible.  
B. It is impossible to obtain operation on 2 different HF bands, without an operating antenna tuner.  
C. Bypass the antenna tuner and shorten the whip to 15 ft.  
**D. Bypass the antenna tuner. Use a straight whip or wire antenna approximately 30 ft long.**  

_No explanation published._

### 1-18C6

Which of the following conditions would be a symptom of malfunction in a 2182 kHz radiotelephone system that must be reported to the Master, then logged appropriately.

A. Much higher noise level observed during daytime operation.  
**B. No indication of power output when speaking into the microphone.**  
C. When testing a radiotelephone alarm on 2182 kHz into an artificial antenna, the Distress frequency watch receiver becomes unmuted, an improper testing procedure.  
D. Failure to contact a shore station 600 nautical miles distant during daytime operation.  

A 2182 kHz transmitter that shows no output power when you speak isn't transmitting, which is a real malfunction. The master must be told about improperly operating radiotelephone equipment, and the failure and the notification are logged. Changes in background noise, or failing to reach a station 600 miles away in daytime (well beyond the 150-mile daytime range the rules require), come from propagation and noise conditions, not equipment faults.

- [47 CFR §80.409](https://www.ecfr.gov/current/title-47/section-80.409): “When the master is notified about improperly operating radiotelephone equipment.”
- [47 CFR §80.855](https://www.ecfr.gov/current/title-47/section-80.855): “during daytime under normal conditions over a range of 150 nautical miles”

## Topic 19. Antennas

Antenna rules and basics.

- VHF (30–200 MHz) voice antennas must be vertically polarized. ([47 CFR §80.81](https://www.ecfr.gov/current/title-47/section-80.81))
- A compulsory ship's required MF radiotelephone antenna must be as non-directional and efficient as practicable for ground waves over seawater. ([47 CFR §80.863](https://www.ecfr.gov/current/title-47/section-80.863))

### 1-19D1

What are the antenna requirements of a VHF telephony coast, maritime utility or ship station?

**A. The shore or on-board antenna must be vertically polarized.**  
B. The antenna array must be type-accepted for 30-200 MHz operation by the FCC.  
C. The horizontally-polarized antenna must be positioned so as not to cause excessive interference to other stations.  
D. The antenna must be capable of being energized by an output in excess of 100 watts.  

Part 80 requires voice transmissions in the 30–200 MHz range, which includes marine VHF, to be vertically polarized. That's why marine VHF antennas are vertical.

- [47 CFR §80.81](https://www.ecfr.gov/current/title-47/section-80.81): “All telephony emissions of a ship station or a marine utility station on board ship within the frequency band 30-200 MHz must be vertically polarized.”

### 1-19D2

What is the antenna requirement of a radiotelephone installation aboard a passenger vessel?

A. The antenna must be located a minimum of 15 meters from the radiotelegraph antenna.  
**B. The antenna must be vertically polarized and as non-directional and efficient as is practicable for the transmission and reception of ground waves over seawater.**  
C. An emergency reserve antenna system must be provided for communications on 156.800 MHz.  
D. All antennas must be tested and the operational results logged at least once during each voyage.  

The required MF radiotelephone antenna must be as non-directional and efficient as practical for radio ground waves over seawater, and built to keep working in an emergency.

- [47 CFR §80.863](https://www.ecfr.gov/current/title-47/section-80.863): “An antenna system must be installed which is as nondirectional and as efficient as is practicable for the transmission and reception of radio ground waves over seawater.”

### 1-19D3

What is the most common type of antenna for GMDSS VHF?

A. Horizontally polarized circular antenna.  
B. Long wire antenna.  
C. Both of the above.  
**D. None of the above.**  

Marine VHF antennas must be vertically polarized, and the usual GMDSS VHF antenna is a vertical whip. Neither a horizontally polarized antenna nor a long wire is used, so the answer is "none of the above."

- [47 CFR §80.81](https://www.ecfr.gov/current/title-47/section-80.81): “within the frequency band 30-200 MHz must be vertically polarized”

### 1-19D4

What is the purpose of the antenna tuner?

**A. It alters the electrical characteristics of the antenna to match the frequency in use.**  
B. It physically alters the length of the antenna to match the frequency in use.  
C. It makes the antenna look like a half-wave antenna at the frequency in use.  
D. None of the above.  

An antenna tuner doesn't change the antenna's physical length. It adds inductance and capacitance so the antenna's electrical impedance matches the transmitter at the frequency in use, which lets one antenna work across many MF/HF frequencies.

_General operating practice, not a quoted rule._


### 1-19D5

What advantage does a vertical whip have over a long wire?

A. It radiates more signal fore and aft.  
**B. It radiates equally well in all directions.**  
C. It radiates a strong signal vertically.  
D. None of the above.  

A vertical whip radiates equally in all horizontal directions, which matters on a ship that's always changing heading. A long wire tends to favor certain directions depending on its length and orientation.

_General operating practice, not a quoted rule._


### 1-19D6

A vertical whip antenna has a radiation pattern best described by?

A. A figure eight.  
B. A cardioid.  
**C. A circle.**  
D. An ellipse.  

Seen from above, a vertical whip's radiation pattern is a circle: it radiates equally in every compass direction. A figure-eight belongs to a horizontal dipole, and a cardioid is a directional pattern.

_General operating practice, not a quoted rule._


## Topic 20. Power Sources

Keeping the radios powered when the ship's power fails.

- A reserve source of energy powers distress and safety radio when main and emergency power fail. ([47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099))
- It must be independent of propulsion and the ship's electrical system. ([47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099))
- Check reserve batteries at least every 30 days. ([47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099))

### 1-20D1

For a small passenger vessel inspection, reserve power batteries must be tested:

A. At intervals not exceeding every 3 months.  
B. At intervals not exceeding every 6 months  
C. Before any new voyage  
**D. At intervals not exceeding 12 months, or during the inspection.**  

_No explanation published._

### 1-20D2

What are the characteristics of the Reserve Source of Energy under GMDSS?

A. Supplies independent HF and MF installations at the same time.  
B. Cannot be independent of the propelling power of the ship.  
**C. Must be independent of the ship’s electrical system when the RSE is needed to supply power to the GMDSS equipment.**  
D. Must be incorporated into the ship’s electrical system.  

The reserve source of energy (RSE) has to work when the ship's own power has failed. So the rules require it to be independent of both the propulsion and the ship's electrical system, and it doesn't have to run the MF and HF installations at the same time.

- [47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099): “The reserve sources of energy must be independent of the propelling power of the ship and the ship's electrical system.”

### 1-20D3

Which of the following terms is defined as a back-up power source that provides power to radio installations for the purpose of conducting Distress and Safety communications when the vessel’s main and emergency generators cannot?

A. Emergency Diesel Generator.  
**B. Reserve Source of Energy.**  
C. Reserve Source of Diesel Power.  
D. Emergency Back-up Generator.  

A reserve source of energy powers the radio installations for distress and safety communications when the ship's main and emergency sources of electrical power have failed.

- [47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099): “A reserve source of energy to supply radio installations must be provided on every ship for the purpose of conducting distress and safety radiocommunications, in the event of failure of the ship's main and emergency sources of electrical power.”

### 1-20D4

In the event of failure of the main and emergency sources of electrical power, what is the term for the source required to supply the GMDSS console with power for conducting distress and other radio communications?

A. Emergency power.  
B. Ship’s emergency diesel generator.  
**C. Reserve source of energy.**  
D. Ship’s standby generator  

The source that keeps the GMDSS radios working after both the main and the emergency generators fail is called the reserve source of energy.

- [47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099): “in the event of failure of the ship's main and emergency sources of electrical power”

### 1-20D5

What is the requirement for emergency and reserve power in GMDSS radio installations?

A. An emergency power source for radio communications is not required if a vessel has proper reserve power (batteries).  
B. A reserve power source is not required for radio communications.  
C. Only one of the above is required if a vessel is equipped with a second 406 EPIRB as a backup means of sending a distress alert.  
**D. All newly constructed ships under GMDSS must have both emergency and reserve power sources for radio communications.**  

Newly constructed GMDSS ships need both: an emergency source of electrical power (required under SOLAS) that backs up main power, and in addition a reserve source of energy that runs the radios for distress and safety communications if both the main and emergency sources fail. One doesn't replace the other, and a second EPIRB doesn't substitute for either.

- [47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099): “A reserve source of energy to supply radio installations must be provided on every ship”
- [47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099): “in the event of failure of the ship's main and emergency sources of electrical power”

### 1-20D6

What is the meaning of “Reserve Source of Energy”?

**A. The supply of electrical energy sufficient to operate the radio installations for the purpose of conducting Distress and Safety communications in the event of failure of the ship’s main and emergency sources of electrical power.**  
B. High caloric value items for lifeboat, per SOLAS regulations.  
C. Diesel fuel stored for the purpose of operating the powered survival craft for a period equal to or exceeding the U.S.C.G. and SOLAS requirements.  
D. None of these.  

"Reserve source of energy" is the electrical supply that can run the radio installations for distress and safety communications after the ship's main and emergency power have both failed. It has nothing to do with food or fuel for survival craft.

- [47 CFR §80.1099](https://www.ecfr.gov/current/title-47/section-80.1099): “A reserve source of energy to supply radio installations must be provided on every ship for the purpose of conducting distress and safety radiocommunications, in the event of failure of the ship's main and emergency sources of electrical power.”

## Topic 21. EPIRBs

Emergency position-indicating radio beacons and the satellite system that hears them.

- GMDSS satellite EPIRBs float free and switch on automatically. ([47 CFR §80.1085](https://www.ecfr.gov/current/title-47/section-80.1085))
- Each 406 MHz EPIRB has a unique ID and must be registered with NOAA. ([47 CFR §80.1061](https://www.ecfr.gov/current/title-47/section-80.1061))
- 406 MHz EPIRBs include a 121.5 MHz homing beacon. ([47 CFR §80.1061](https://www.ecfr.gov/current/title-47/section-80.1061))
- Accidental activation? Call the Coast Guard (for an EPIRB). ([NOAA SARSAT](https://www.sarsat.noaa.gov/false.html))

### 1-21D1

What is an EPIRB?

**A. A battery-operated emergency position-indicating radio beacon that floats free of a sinking ship.**  
B. An alerting device notifying mariners of imminent danger.  
C. A satellite-based maritime distress and safety alerting system.  
D. A high-efficiency audio amplifier.  

An EPIRB (emergency position-indicating radio beacon) is a battery-powered beacon whose signal helps search and rescue find you. A GMDSS satellite EPIRB must be able to float free if the ship sinks and switch on automatically when afloat, and it can also be activated by hand.

- [47 CFR §80.5](https://www.ecfr.gov/current/title-47/section-80.5): “A station in the maritime mobile service the emissions of which are intended to facilitate search and rescue operations.”
- [47 CFR §80.1085](https://www.ecfr.gov/current/title-47/section-80.1085): “capable of floating free if the ship sinks and of being automatically activated when afloat, and capable of being activated manually”

### 1-21D2

When are EPIRB batteries changed?

A. After emergency use; after battery life expires.  
**B. After emergency use or within the month and year replacement date printed on the EPIRB.**  
C. After emergency use; every 12 months when not used.  
D. Whenever voltage drops to less than 20% of full charge.  

_No explanation published._

### 1-21D3

If a ship sinks, what device is designed to float free of the mother ship, is turned on automatically and transmits a distress signal?

**A. An emergency position indicating radio beacon.**  
B. EPIRB on 2182 kHz and 405.025 kHz.  
C. Bridge-to-bridge transmitter on 2182 kHz.  
D. Auto alarm keyer on any frequency.  

The device built to float free of a sinking ship, switch on by itself and send a distress signal is the EPIRB. The other choices name the wrong frequencies or equipment.

- [47 CFR §80.1085](https://www.ecfr.gov/current/title-47/section-80.1085): “capable of floating free if the ship sinks and of being automatically activated when afloat”

### 1-21D4

How do you cancel a false EPIRB distress alert?

A. Transmit a DSC distress alert cancellation.  
B. Transmit a broadcast message to “all stations” canceling the distress message.  
**C. Notify the Coast Guard or rescue coordination center at once.**  
D. Make a radiotelephony “distress cancellation” transmission on 2182 kHz.  

An EPIRB alert goes by satellite to search and rescue authorities, not to nearby ships, so a radio broadcast can't cancel it. Turn the beacon off and call the Coast Guard (for an EPIRB) or the rescue coordination center right away.

- [NOAA SARSAT, Preventing False Alerts](https://www.sarsat.noaa.gov/false.html): “please call the U . S . Coast Guard if the beacon is an EPIRB”
- [47 CFR §80.335](https://www.ecfr.gov/current/title-47/section-80.335): “ships may use additional appropriate means available to them to inform the nearest appropriate U.S. Coast Guard rescue coordination center that a false distress alert has been transmitted”

### 1-21D5

What is the COSPAS-SARSAT system?

A. A global satellite communications system for users in the maritime, land and aeronautical mobile services.  
**B. An international satellite-based search and rescue system.**  
C. A broadband military satellite communications network.  
D. A Wide Area Geostationary Satellite program (WAGS).  

COSPAS-SARSAT is the international satellite system that detects 406 MHz distress beacons (EPIRBs, ELTs and PLBs) and passes their alerts to search and rescue authorities. NOAA runs the U.S. part of it.

- [47 CFR §80.1061](https://www.ecfr.gov/current/title-47/section-80.1061): “the United States Program Manager for the 406.0-406.1 MHz COSPAS/SARSAT satellite system”
- [NOAA SARSAT, Preventing False Alerts](https://www.sarsat.noaa.gov/false.html): “This is the first marine rescue thanks to location data from a Cospas-Sarsat satellite.”

### 1-21D6

What is an advantage of a 406 MHz satellite EPIRB?

A. It is compatible with the COSPAS-SARSAT Satellites and Global Maritime Distress Safety System (GMDSS) regulations.  
B. Provides a fast, accurate method for the Coast Guard to locating and rescuing persons in distress.  
C. Includes a digitally encoded message containing the ship’s identity and nationality.  
**D. All of the above.**  

406 MHz EPIRBs work with the COSPAS-SARSAT satellites and meet the GMDSS rules. Each one sends a unique digital identification code, registered with NOAA, that tells rescuers which vessel it belongs to. They also carry a 121.5 MHz homing beacon so rescuers can find them. All of the choices are advantages.

- [47 CFR §80.1061](https://www.ecfr.gov/current/title-47/section-80.1061): “must be programmed in each EPIRB unit to establish a unique identification for each EPIRB station”
- [47 CFR §80.1061](https://www.ecfr.gov/current/title-47/section-80.1061): “The 406.0-406.1 EPIRB must contain as an integral part a “homing” beacon operating only on 121.500 MHz”

## Topic 22. SARTs

Search and rescue radar transponders: how survivors show up on a rescuer's radar.

- SARTs work at 9 GHz (X-band). ([Recommendation ITU-R M.628-5](https://www.itu.int/rec/R-REC-M.628/en))
- The reply is 12 sweeps, seen on radar as a line of 12 dots. ([Recommendation ITU-R M.628-5](https://www.itu.int/rec/R-REC-M.628/en))
- Keep the antenna at least 1 m up for range. ([Recommendation ITU-R M.628-5](https://www.itu.int/rec/R-REC-M.628/en))
- A light or sound tells survivors a radar has triggered it. ([IMO Resolution A.802(19)](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.802(19).pdf))

### 1-22D1

In which frequency band does a search and rescue transponder operate?

A. 3 GHz.  
B. S-band.  
C. 406 MHz.  
**D. 9 GHz.**  

A search and rescue transponder (SART) works in the 9 GHz (X-band) radar band, specifically 9,200–9,500 MHz.

- [Recommendation ITU-R M.628-5, Technical characteristics for search and rescue radar transponders](https://www.itu.int/rec/R-REC-M.628/en): “Frequency: 9 200-9 500 MHz.”

### 1-22D2

How should the signal from a Search And Rescue Radar Transponder appear on a RADAR display?

A. A series of dashes.  
B. A series of spirals all originating from the range and bearing of the SART.  
**C. A series of 12 equally spaced dots.**  
D. A series of twenty dashes.  

When a SART is triggered by a radar, it replies with 12 sweeps. These show on the radar screen as a line of 12 evenly spaced dots running outward from the SART's position. Survivors are at the dot closest to the radar's center.

- [Recommendation ITU-R M.628-5, Technical characteristics for search and rescue radar transponders](https://www.itu.int/rec/R-REC-M.628/en): “The response signal should consist of 12 sweeps.”

### 1-22D3

What is the purpose of the SART’s audible tone alarm?

**A. It informs survivors that assistance may be nearby.**  
B. It informs survivors when the battery’s charge condition has weakened.  
C. It informs survivors when the SART switches to the “standby” mode.  
D. It informs survivors that a nearby vessel is signaling on DSC.  

A SART must have a visual or audible indicator, or both, that shows it's working and tells survivors when a radar has triggered it. That means a searching ship or aircraft is nearby.

- [IMO Resolution A.802(19), Performance standards for survival craft radar transponders](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.802(19).pdf): “to indicate correct operation and to alert survivors to the fact that a radar has triggered”

### 1-22D4

Which statement is true regarding the SART?

A. This is a performance monitor attached to at least one S-band navigational RADAR system.  
B. This is a 9 GHz transponder capable of being received by another vessel’s S-band navigational RADAR system.  
C. This is a performance monitor attached to at least one X-band navigational RADAR system.  
**D. This is a 9 GHz transponder capable of being received by vessel’s X-band navigational RADAR system.**  

A SART is a 9 GHz transponder, so it shows up on X-band (3 cm, 9 GHz) navigational radars. S-band radars, at 3 GHz, won't trigger it.

- [Recommendation ITU-R M.628-5, Technical characteristics for search and rescue radar transponders](https://www.itu.int/rec/R-REC-M.628/en): “radars operating in the frequency band 9 200-9 500 MHz”

### 1-22D5

At what point does a SART begin transmitting?

A. It immediately begins radiating when placed in the “on” position.  
B. It must be manually activated.  
**C. If it has been placed in the “on” position, it will respond when it has been interrogated by a 9-GHz RADAR signal.**  
D. If it has been placed in the “on” position, it will begin transmitting immediately upon detecting that it is in water.  

A SART that's switched on waits in standby, listening. It transmits only when a 9 GHz radar pulse hits it, which is why it can last 96 hours on standby and still respond for 8 hours.

- [Recommendation ITU-R M.628-5, Technical characteristics for search and rescue radar transponders](https://www.itu.int/rec/R-REC-M.628/en): “96 h in stand-by condition followed by 8 h of transponder”

### 1-22D6

How can a SART’s effective range be maximized?

A. The SART should be placed in water immediately upon activation.  
**B. The SART should be held as high as possible.**  
C. Switch the SART into the “high” power position.  
D. If possible, the SART should be mounted horizontally so that its signal matches that of the searching RADAR signal.  

Radar range depends on height, so the higher the SART, the farther away radars can detect it. The ITU standard calls for an antenna height of at least 1 meter. Tests show that height gives roughly 8 nautical miles of detection range, compared with less at 0.5 m.

- [Recommendation ITU-R M.628-5, Technical characteristics for search and rescue radar transponders](https://www.itu.int/rec/R-REC-M.628/en): “the height of the installed SART antenna should be at least 1 m”

## Topic 23. Survival Craft VHF

Portable two-way VHF radios for survival craft.

- Channel 16 plus at least one other channel, simplex voice only. ([IMO Resolution A.809(19)](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf))
- Watertight to 1 m for 5 minutes. ([IMO Resolution A.809(19)](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf))
- At least 0.25 W effective radiated power. ([IMO Resolution A.809(19)](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf))
- For on-scene talk between survival craft, ships and rescue units. ([IMO Resolution A.809(19)](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf))

### 1-23D1

Which statement is NOT true regarding the requirements of survival craft portable two-way VHF radiotelephone equipment?

A. Watertight to a depth of 1 meter for 5 minutes.  
B. Effective radiated power should be a minimum of 0.25 watts.  
**C. Operates simplex on Ch-70 and at least one other channel.**  
D. The antenna is fixed and non-removable.  

Under the IMO standard, survival craft VHF radios must work on Channel 16 and at least one other channel, and every channel must be for single-frequency voice only. Channel 70 is reserved for digital selective calling, so "operates on Ch-70" is the false statement. The other choices are real requirements: watertight to 1 meter for 5 minutes, and at least 0.25 watt effective radiated power.

- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “(VHF channel 16) and on at least one additional channel.”
- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “All channels fitted should be for single-frequency voice communication only.”
- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “be watertight to a depth of 1 m for at least 5 min;”

### 1-23D2

Which statement is NOT true regarding the requirements of survival craft portable two-way VHF radiotelephone equipment?

**A. Operation on Ch-13.**  
B. Effective radiated power should be a minimum of 0.25 Watts.  
C. Simplex voice communications only.  
D. Operation on Ch-16.  

The IMO standard requires survival craft VHF radios to work on Channel 16 plus at least one additional channel, for single-frequency (simplex) voice only, with at least 0.25 watt effective radiated power. Channel 13 isn't a requirement, so "operation on Ch-13" is the false statement.

- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “(VHF channel 16) and on at least one additional channel.”
- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “The effective radiated power should be a minimum of 0.25 W.”

### 1-23D3

With what other stations may portable survival craft transceivers communicate?

A. Communication is permitted between survival craft.  
B. Communication is permitted between survival craft and ship.  
C. Communication is permitted between survival craft and rescue unit.  
**D. All of the above.**  

Survival craft VHF radios are for on-scene communication between survival craft, between survival craft and a ship, and between survival craft and a rescue unit. The answer is all of these.

- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “between survival craft, between survival craft and ship and between survival craft and rescue unit.”

### 1-23D4

Equipment for radiotelephony use in survival craft stations under GMDSS must have what capability?

**A. Operation on Ch-16.**  
B. Operation on 457.525 MHz.  
C. Operation on 121.5 MHz.  
D. Any one of these.  

Under GMDSS, survival craft two-way VHF radios must work on Channel 16 (156.800 MHz) plus at least one other single-frequency voice channel. The FCC's general survival craft rule (§80.271) also allows 457.525 MHz instead of 156.800 MHz, which is why 457.525 appears as a choice, but GMDSS equipment needs Channel 16.

- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “The two-way radiotelephone should be capable of operation on the frequency 156.800 MHz (VHF channel 16) and on at least one additional channel.”
- [47 CFR §80.1101](https://www.ecfr.gov/current/title-47/section-80.1101): “Two-Way VHF radiotelephone: (i) IMO Resolution A.809(19)”
- [47 CFR §80.271](https://www.ecfr.gov/current/title-47/section-80.271): “The transceivers must receive and transmit either on 457.525 MHz or on 156.800 MHz;”

### 1-23D5

Equipment for radiotelephony use in survival craft stations under GMDSS must have what characteristic(s)?

A. Operation on Ch-16.  
B. Watertight.  
C. Permanently-affixed antenna.  
**D. All of these.**  

Under the GMDSS standard (IMO A.809), survival craft radios must work on Channel 16 and be watertight to a depth of 1 m for at least 5 minutes. FCC rules add that the antenna must be permanently attached (or need a special tool to remove). The answer is all of these.

- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “The two-way radiotelephone should be capable of operation on the frequency 156.800 MHz (VHF channel 16)”
- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “be watertight to a depth of 1 m for at least 5 min”
- [47 CFR §80.271](https://www.ecfr.gov/current/title-47/section-80.271): “The antenna must be permanently attached to the device or its removal must require the use of a special tool.”

### 1-23D6

What is the minimum power of the SCT

A. Five watts.  
**B. One watt.**  
C. 1/4 watt.  
D. None of the above.  

The exam's key says "one watt." Under the IMO performance standard, 1 watt is the level a survival craft radio must be able to reduce to: above 1 W, it needs a switch to bring power down to 1 W or less.

> Heads up: The IMO standard sets the minimum effective radiated power at 0.25 W, as other questions in this pool say. This question's key (one watt) doesn't match that minimum. Expect "one watt" on the exam.

- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “The effective radiated power should be a minimum of 0.25 W. Where the effective radiated”
- [IMO Resolution A.809(19), Performance standards for survival craft two-way VHF radiotelephone apparatus](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.809(19).pdf): “power exceeds 1 W, a power reduction switch to reduce the power to 1 W or less is required.”

## Topic 24. NAVTEX

NAVTEX: automatic, printed maritime safety information near the coast.

- International NAVTEX is on 518 kHz. ([IMO MSC.1/Circ.1403/Rev.1](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf))
- Messages are grouped by subject letter (B2), and receivers can reject subjects. ([IMO MSC.1/Circ.1403/Rev.1](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf))
- Range is typically a few hundred nautical miles. ([IMO MSC.1/Circ.1403/Rev.1](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf))
- MSI also arrives by HF NBDP and satellite (SafetyNET). ([National Weather Service](https://www.weather.gov/marine/gmdss))

### 1-24D1

NAVTEX broadcasts are sent:

A. Immediately following traffic lists.  
**B. In categories of messages indicated by a single letter or identifier.**  
C. On request of maritime mobile stations.  
D. Regularly, after the radiotelephone silent periods.  

NAVTEX messages are grouped by subject, and each group is identified by a single letter called the B2 subject indicator. The receiver uses that letter to sort messages and reject subjects you don't need.

- [IMO MSC.1/Circ.1403/Rev.1, Revised NAVTEX Manual](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf): “Information is grouped by subject in the NAVTEX broadcast and each subject group”
- [IMO MSC.1/Circ.1403/Rev.1, Revised NAVTEX Manual](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf): “is allocated a B2 subject indicator character.”

### 1-24D2

MSI can be obtained by one (or more) of the following:

A. NAVTEX.  
B. SafetyNET.  
C. HF NBDP.  
**D. All of the above.**  

Maritime safety information (MSI) reaches ships in several ways: NAVTEX on MF, HF narrow-band direct printing, and satellite services such as Inmarsat SafetyNET. The answer is all of these.

- [National Weather Service, Marine products via GMDSS](https://www.weather.gov/marine/gmdss): “preparing meteorological forecasts and warnings for broadcast via NAVTEX , HF Narrow Band Direct Printing (NBDP) and approved satellite providers SafetyNET and Safetycast”

### 1-24D3

Which of the following is the primary frequency that is used exclusively for NAVTEX broadcasts internationally?

**A. 518 kHz.**  
B. 2187.5 kHz.  
C. 4209.5 kHz.  
D. VHF channel 16 when the vessel is sailing in Sea Area A1, and 2187.5 kHz when in Sea Area A2.  

518 kHz is the international NAVTEX frequency, broadcast in English. 490 kHz and 4209.5 kHz are used for national or supplementary NAVTEX services.

- [IMO MSC.1/Circ.1403/Rev.1, Revised NAVTEX Manual](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf): “automatic reception on 518 kHz of maritime safety information by means of”

### 1-24D4

What means are used to prevent the reception of unwanted broadcasts by vessels utilizing the NAVTEX system?

A. Operating the receiver only during daytime hours.  
B. Coordinating reception with published broadcast schedules.  
**C. Programming the receiver to reject unwanted broadcasts.**  
D. Automatic receiver de-sensitization during night hours.  

NAVTEX receivers can be set to reject message subjects you don't need, using the B2 subject indicator letters. Ice reports, for example, can be turned off. The receiver rejects them automatically, so you don't have to schedule listening times.

- [IMO MSC.1/Circ.1403/Rev.1, Revised NAVTEX Manual](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf): “Some subject indicator characters can be used to reject messages concerning certain”

### 1-24D5

When do NAVTEX broadcasts typically achieve maximum transmitting range?

A. Local noontime.  
**B. Middle of the night.**  
C. Sunset.  
D. Post sunrise.  

Medium-frequency signals like NAVTEX's 518 kHz carry much farther after dark. In daytime the lower ionosphere absorbs them, and at night that absorption fades. The IMO NAVTEX Manual reflects this: the needed range normally takes about 60% less transmitter power at night.

_General operating practice, not a quoted rule._

- [IMO MSC.1/Circ.1403/Rev.1, Revised NAVTEX Manual](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf): “than 1 kW during daylight with a 60% reduction during night conditions.”

### 1-24D6

What is the transmitting range of most NAVTEX stations?

A. Typically 50-100 nautical miles (90-180 km) from shore.  
B. Typically upwards of 1000 nautical miles (1800 km) during the daytime.  
**C. Typically 200-400 nautical miles (360-720 km).**  
D. It is limited to line-of-sight or about 30 nautical miles (54 km).  

Most NAVTEX stations cover a few hundred nautical miles. The IMO NAVTEX Manual cites a required range of 250 to 400 nautical miles and a designed maximum range of about 400, and the National Weather Service describes coverage within about 200 nautical miles of shore. That fits the 200–400 nautical mile answer.

- [IMO MSC.1/Circ.1403/Rev.1, Revised NAVTEX Manual](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf): “Experience indicates that the required range of 250 to 400”
- [IMO MSC.1/Circ.1403/Rev.1, Revised NAVTEX Manual](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/MSC.1-Circ.1403-Rev.1%20-%20REVISED%20NAVTEX%20MANUAL%20(Secretariat).pdf): “NAVTEX transmissions have a designed maximum range of about 400 nautical miles.”
- [National Weather Service, Marine products via GMDSS](https://www.weather.gov/marine/gmdss): “within approximately 200 nautical miles of shore”
