import { SecretMessage, FinalSecret } from '../types';
import { FINALES_SOUL, FINALES_HEART, FINALES_SPARKLE, FINALES_DREAM } from './finaleMessages';

export const SECRETS_SOUL: SecretMessage[] = [
  // Set 1: Halal Love & Spiritual Bond (1-7)
  { id: 'soul_1', gesture: 'Thumb_Up', state: 'happy', variants: ['يا عائشة، لما ربنا كتبلي حبك، حسيت إنه رزقني بأجمل توفيق وبداية طريق الحلال والجنة سوا.'] },
  { id: 'soul_2', gesture: 'Pointing_Up', state: 'reading', variants: ['ثباتك على نقابك وحياؤك في زمن الفتن ده بيخليني فخور بيكي جداً وبحمد ربنا عليكي في كل صلاة.'] },
  { id: 'soul_3', gesture: 'Victory', state: 'happy', variants: ['حبنا ده مش مجرد خطوبة، ده عهد قدام ربنا إننا نفضل سند لبعض لحد ما نوصل سوا لأعلى درجات الجنة.'] },
  { id: 'soul_4', gesture: 'ILoveYou', state: 'love', variants: ['دعائي ليكي في جوف الليل هو أصدق لغة حب أقدر أعبرلك بيها عن مكانتك الكبيرة في قلبي.'] },
  { id: 'soul_5', gesture: 'Closed_Fist', state: 'shy', variants: ['يا رب يبارك في حياؤك اللي بيخليني أحترمك كل يوم أكتر وأشكر ربنا إنه اختارني أصون الجوهرة دي.'] },
  { id: 'soul_6', gesture: 'Open_Palm', state: 'surprise', variants: ['كل ما بفكر في بيتنا الجاي، بتمنى يكون بيت عامر بذكر الله، والقرآن هو دستورنا والسكينة هي عنواننا.'] },
  { id: 'soul_7', gesture: 'Thumb_Up', state: 'happy', variants: ['إنتي الهدية الطيبة اللي دعيت ربنا بيها كتير، والحمد لله إن استجاب لقلبي ورزقني بيكي يا عائشة.'] },

  // Set 2: Deep Mutual Support & Building the Future (8-14)
  { id: 'soul_8', gesture: 'Pointing_Up', state: 'reading', variants: ['عارفة يا روحي؟ حبك بيقربني من ربنا أكتر، لأن كل تفصيلة فيكي بتفكرني بنعم ربنا العظيمة عليا.'] },
  { id: 'soul_9', gesture: 'Victory', state: 'happy', variants: ['في صلاتي دايماً بفتكرك، وبدعي إن قلبي وقلبك يفضلوا موصولين بطاعة ربنا دايماً وفي كل الأحوال.'] },
  { id: 'soul_10', gesture: 'ILoveYou', state: 'love', variants: ['الرزق مش بس فلوس، الرزق الحقيقي هو زوجة صالحة تعينك على أمر دينك ودنياك.. وإنتي رزقي الأعظم.'] },
  { id: 'soul_11', gesture: 'Closed_Fist', state: 'shy', variants: ['لما بكتبلك رسايل، بكتبها بقلب ساجد بيشكر ربنا على وجودك اللي جمّل كل حياتي.'] },
  { id: 'soul_12', gesture: 'Open_Palm', state: 'surprise', variants: ['يا درتي المصونة، نقابك مش بس سترة، ده رمز للعفة والجمال والنقاء اللي مفيش زيه في الدنيا.'] },
  { id: 'soul_13', gesture: 'Thumb_Up', state: 'happy', variants: ['بتخيل اللحظة اللي هنقعد فيها نقرأ الورد اليومي سوا ونشجع بعض على حفظ كتاب الله.'] },
  { id: 'soul_14', gesture: 'Pointing_Up', state: 'reading', variants: ['ربنا يجمعنا على منابر من نور، ونكون قدوة في الحب الحلال والصبر الجميل لحد ما يجمعنا بيتنا.'] },

  // Set 3: Ultimate Promise & Divine Blessings (15-21)
  { id: 'soul_15', gesture: 'Victory', state: 'happy', variants: ['كل ما ببص لطريقنا سوا، برتاح لأن الأساس بتاعنا هو رضا ربنا.. وده اللي هيخليه طريق مبارك.'] },
  { id: 'soul_16', gesture: 'ILoveYou', state: 'love', variants: ['يا عائشة، إنتي مش بس نصفي التاني، إنتي طمأنينة روحي اللي كنت بدور عليها طول حياتي.'] },
  { id: 'soul_17', gesture: 'Closed_Fist', state: 'shy', variants: ['حبي ليكي مكتوب بالدعوات والرجاء في الحلال، ربنا يحفظك ليا من كل عين ويحميكي من كل سوء.'] },
  { id: 'soul_18', gesture: 'Open_Palm', state: 'surprise', variants: ['يا رب تكوني دايماً قرة عيني في الدنيا والآخرة، ونعيش سوا في طاعتك ورضاك.'] },
  { id: 'soul_19', gesture: 'Thumb_Up', state: 'happy', variants: ['صبرنا على البعد دلوقتي هو اللي هيخلي طعم الحلال أجمل بكتير لما نتجمع في بيتنا بإذن الله.'] },
  { id: 'soul_20', gesture: 'Pointing_Up', state: 'reading', variants: ['لما الدنيا بتضيق بيا، بفتكر إن ربنا شايللي فرحة كبيرة في الحلال معاكي، فبهون عليا كل حاجة.'] },
  { id: 'soul_21', gesture: 'Victory', state: 'happy', variants: ['يا طيبة القلب والروح، ربنا يجعلني الزوج الصالح اللي تعيشي معاه في أمان وسكينة طول العمر.'] }
];

export const SECRETS_HEART: SecretMessage[] = [
  // Set 1: Comfort & Comforting during Fatigue (1-7)
  { id: 'heart_1', gesture: 'Thumb_Up', state: 'happy', variants: ['يا عائشة، لو حاسة بتعب أو ضغط النهارده، ارتاحي وريحي بالك.. صحتك بالدنيا كلها عندي.'] },
  { id: 'heart_2', gesture: 'Pointing_Up', state: 'reading', variants: ['ساعات الدنيا بتبقى تقيلة، بس افتكري دايماً إنك مش لوحدك، تعبك ده بيوجعني وهفضل سندك دايماً.'] },
  { id: 'heart_3', gesture: 'Victory', state: 'happy', variants: ['افصلي دماغك خالص عن التفكير في المشاكل دلوقتي، خدي نفس عميق وسيبي بكرة لصاحب بكرة.'] },
  { id: 'heart_4', gesture: 'ILoveYou', state: 'love', variants: ['أنا مستعد أسمعك بالساعات لو حاسة بضيق أو محتاجة تفضفضي، قلبي دايماً مفتوح ليكي وسامعك.'] },
  { id: 'heart_5', gesture: 'Closed_Fist', state: 'shy', variants: ['يا ست البنات، مفيش أي حاجة في الدنيا تستاهل زعلك أو تخلي عيونك الجميلة تدمع.'] },
  { id: 'heart_6', gesture: 'Open_Palm', state: 'surprise', variants: ['اعملي لنفسك كوباية مشروب دافئ، واقعدي في مكان هادي، وحسي بوجودي جنبك بيطمنك.'] },
  { id: 'heart_7', gesture: 'Thumb_Up', state: 'happy', variants: ['إنتي قوية ومر عليكي أصعب من كده وعديتيه، ثقتي في صمودك ملهاش حدود يا بطلتي.'] },

  // Set 2: Emotional Healing & Safety (8-14)
  { id: 'heart_8', gesture: 'Pointing_Up', state: 'reading', variants: ['أنا جنبك عشان أشيل تعبك وأقسم معاكي الهم، ربنا يقدرني وأكون دايماً مصدر راحتك وأمانك.'] },
  { id: 'heart_9', gesture: 'Victory', state: 'happy', variants: ['يا عائشة، لما بتزعلي، دنيتي كلها بتضلم.. فارجوكي خلي ابتسامتك دايماً منورة وشك الطيب.'] },
  { id: 'heart_10', gesture: 'ILoveYou', state: 'love', variants: ['لو حاسة إن المسؤوليات كتيرة، خدي إجازة قصيرة لنفسك ونامي بدري، جسمك وعقلك يستاهلوا الراحة.'] },
  { id: 'heart_11', gesture: 'Closed_Fist', state: 'shy', variants: ['كل ما تلاقي الدنيا صعبة، افتكري إن في حد هنا بيحبك ويدعيلك تكوني دايماً مبسوطة وبخير.'] },
  { id: 'heart_12', gesture: 'Open_Palm', state: 'surprise', variants: ['ريحي قلبك، ربنا شايلك الأجمل دايماً، وتدبيره أحسن بكتير من كل قلق بنفكر فيه.'] },
  { id: 'heart_13', gesture: 'Thumb_Up', state: 'happy', variants: ['اهتمامك بنفسك وصحتك هو اللي بيطمني عليكي من بعيد.. متقصرين في حق نفسك يا روحي.'] },
  { id: 'heart_14', gesture: 'Pointing_Up', state: 'reading', variants: ['لما تروحي تنامي، استعيذي بالله وسيبي كل قلق اليوم ورا ضهرك، نوم العافية يا عائشة.'] },

  // Set 3: Warm Safe Haven & Reassurance (15-21)
  { id: 'heart_15', gesture: 'Victory', state: 'happy', variants: ['مستني اليوم اللي هترجعي فيه من تعبك وتلاقي بيتنا هو الأمان والملجأ الدافي ليكي.'] },
  { id: 'heart_16', gesture: 'ILoveYou', state: 'love', variants: ['يا أغلى ما أملك، تعبك غالي عليا أوي، بتمنى لو أقدر أتحمل عنك كل لحظة ضيق.'] },
  { id: 'heart_17', gesture: 'Closed_Fist', state: 'shy', variants: ['لو حسيتي في يوم بالخوف أو القلق، افتكري إن حبي ليكي حصن دايماً هيحميكي ويسندك.'] },
  { id: 'heart_18', gesture: 'Open_Palm', state: 'surprise', variants: ['ربنا يملأ قلبك سكينة وطمأنينة، ويبعد عنك أي خوف من بكرة أو المستقبل.'] },
  { id: 'heart_19', gesture: 'Thumb_Up', state: 'happy', variants: ['ابتسامتك الهادية هي الدوا لكل وجع فيا، فحافظي عليها عشان خاطري يا عائشة.'] },
  { id: 'heart_20', gesture: 'Pointing_Up', state: 'reading', variants: ['يا رب يريح عقلك وقلبك ويهديلك نفسك دايماً في كل أمر بتمر بيه.'] },
  { id: 'heart_21', gesture: 'Victory', state: 'happy', variants: ['خلصنا رسايل الدعم والراحة، بس هفضل دايماً الأمان الحقيقي ليكي في الواقع طول العمر.'] }
];

export const SECRETS_SPARKLE: SecretMessage[] = [
  // Set 1: Inspiration & Goal Motivation (1-7)
  { id: 'sparkle_1', gesture: 'Thumb_Up', state: 'happy', variants: ['يا عائشة، ذكائك وشطارتك هما الطاقة اللي بتنور حياتنا، كملي نجاحك ومتخليش حاجة توقفك.'] },
  { id: 'sparkle_2', gesture: 'Pointing_Up', state: 'reading', variants: ['فخور جداً بطموحك وسعيك المستمر لتطوير نفسك، إنتي بجد قدوة ومثال للبنت المحترمة الناجحة.'] },
  { id: 'sparkle_3', gesture: 'Victory', state: 'happy', variants: ['مفيش أي عقبة هتقف قدامك طول ما إنتي مصممة على هدفك وواثقة في قدراتك الكبيرة.'] },
  { id: 'sparkle_4', gesture: 'ILoveYou', state: 'love', variants: ['إنتي تستاهلي دايماً تكوني في أحسن مكانة، وأنا واثق إن بكرة مليان نجاحات تليق بيكي.'] },
  { id: 'sparkle_5', gesture: 'Closed_Fist', state: 'shy', variants: ['أفكارك وعقلك المنظم بيبهروني كل مرة بنتكلم فيها، ربنا يحفظلك العقل الجميل ده.'] },
  { id: 'sparkle_6', gesture: 'Open_Palm', state: 'surprise', variants: ['سعيك واجتهادك هو اللي هيصنع مستقبلنا سوا، وأنا دايماً في ضهرك وبشجعك بكل قوتي.'] },
  { id: 'sparkle_7', gesture: 'Thumb_Up', state: 'happy', variants: ['يا بطلتي، خطوة بخطوة وإنجاز ورا إنجاز لحد ما تلمعي في المجال اللي بتحبيه وتوصلي للقمة.'] },

  // Set 2: Celebrating Wins & Sparking Ambition (8-14)
  { id: 'sparkle_8', gesture: 'Pointing_Up', state: 'reading', variants: ['لما بتعملي حاجة بتنجحي فيها، ببقى حاسس كأني أنا اللي نجحت بالظبط.. فرحتي بيكي ملهاش حدود.'] },
  { id: 'sparkle_9', gesture: 'Victory', state: 'happy', variants: ['يا عائشة، إنتي مش بنت عادية، إنتي عندك طاقة ولمعان خاص بيخليكي مميزة في كل مكان تدخلي فيه.'] },
  { id: 'sparkle_10', gesture: 'ILoveYou', state: 'love', variants: ['مهما كانت دراستك أو شغلك متعبين، النتيجة والنجاح هيخلوكي تنسي كل اللحظات دي ويسعدوا قلبك.'] },
  { id: 'sparkle_11', gesture: 'Closed_Fist', state: 'shy', variants: ['يا رب أشوفك دايماً في أعلى المناصب وأنجح وحدة في مجالك، وتفضلي دايماً فخر ليا.'] },
  { id: 'sparkle_12', gesture: 'Open_Palm', state: 'surprise', variants: ['التفوق والتميز اتخلقوا عشانك، فمتتنازليش أبداً عن أحلامك وطموحاتك الكبيرة.'] },
  { id: 'sparkle_13', gesture: 'Thumb_Up', state: 'happy', variants: ['أنا أول واحد هيقف يسقفلك لما تستلمي شهادة نجاحك أو تحققي هدفك الجاي.'] },
  { id: 'sparkle_14', gesture: 'Pointing_Up', state: 'reading', variants: ['كل يوم بتعلم منك الإصرار وحب المعرفة، ربنا يبارك في علمك وعملك يا عائشة.'] },

  // Set 3: Ultimate Future & Pride (15-21)
  { id: 'sparkle_15', gesture: 'Victory', state: 'happy', variants: ['بتخيل بكرة لما نكبر سوا وتكوني إنتي الزوجة والأم العظيمة اللي هتربي ولادنا على النجاح والطموح.'] },
  { id: 'sparkle_16', gesture: 'ILoveYou', state: 'love', variants: ['يا نجمتي المضيئة، وجودك في حياتي بيخليني أنا كمان عاوز أكون أحسن وأنجح عشان أليق بيكي.'] },
  { id: 'sparkle_17', gesture: 'Closed_Fist', state: 'shy', variants: ['مفيش فخر في الدنيا يضاهي فخري بإن إنتي شريكة حياتي واختياري الجميل.'] },
  { id: 'sparkle_18', gesture: 'Open_Palm', state: 'surprise', variants: ['ربنا يفتحلك أبواب الرزق والتوفيق من واسع فضله وينورلك كل طرقك.'] },
  { id: 'sparkle_19', gesture: 'Thumb_Up', state: 'happy', variants: ['عزيمتك دي بتخليني متأكد إن مفيش مستحيل هيقف قدامنا وإحنا سوا.'] },
  { id: 'sparkle_20', gesture: 'Pointing_Up', state: 'reading', variants: ['يا عائشة، خليكي دايماً فخورة بنفسك وبشغلك، لأنك بجد مميزة وتستاهلي الأفضل.'] },
  { id: 'sparkle_21', gesture: 'Victory', state: 'happy', variants: ['بانتهاء رسايل التألق، عهد عليا أكون المشجع الأول والداعم الأكبر ليكي في كل خطوة في الحياة.'] }
];

export const SECRETS_DREAM: SecretMessage[] = [
  // Set 1: Romantic Bedtime & Sweet Whispers (1-7)
  { id: 'dream_1', gesture: 'Thumb_Up', state: 'happy', variants: ['يا أميرة أحلامي، الليل جه عشان يطبطب على قلبك.. نامي وروحي في حلم جميل شبهك.'] },
  { id: 'dream_2', gesture: 'Pointing_Up', state: 'reading', variants: ['كل ما ببص للنجوم بالليل، بفتكر لمعة عينيكي وجمال نقابك وبدعي نكون سوا قريب.'] },
  { id: 'dream_3', gesture: 'Victory', state: 'happy', variants: ['بتخيل بكرة لما نكون سوا في بيتنا الصغير، ونشرب الشاي بالليل ونضحك على ذكريات أيام زمان.'] },
  { id: 'dream_4', gesture: 'ILoveYou', state: 'love', variants: ['يا عائشة، إنتي الحلم الجميل اللي دعيت بيه طول عمري، وربنا حققه وجمّعنا في الحلال.'] },
  { id: 'dream_5', gesture: 'Closed_Fist', state: 'shy', variants: ['الليل بيبقى أحلى لما بفتكر إن بكره خطوة جديدة بتقربنا أكتر لليوم الموعود.'] },
  { id: 'dream_6', gesture: 'Open_Palm', state: 'surprise', variants: ['غمضي عينيكي الجمال ونامي متطمنة، روحي وعقلي دايماً معاكي وبيحرسوكي بدعواتي.'] },
  { id: 'dream_7', gesture: 'Thumb_Up', state: 'happy', variants: ['يا رب تكون أحلامك النهارده كلها ورد وفرحة تليق بقلبك الطيب.'] },

  // Set 2: Imagining the Future Household (8-14)
  { id: 'dream_8', gesture: 'Pointing_Up', state: 'reading', variants: ['أنا بعد الأيام عشان أشوفك في بيتي، ملكة متوجة في مملكتنا البسيطة اللي هنبنيها بالحب.'] },
  { id: 'dream_9', gesture: 'Victory', state: 'happy', variants: ['في أحلامي دايماً بشوفك رفيقة عمري وسندي في الضيق قبل الفرح، يا حلالي الجميل.'] },
  { id: 'dream_10', gesture: 'ILoveYou', state: 'love', variants: ['يا رب يجمعنا تحت سقف واحد على مودة وسكينة ونربي ولادنا على طاعة ربنا وحب النبي.'] },
  { id: 'dream_11', gesture: 'Closed_Fist', state: 'shy', variants: ['كل حلم بحلمه بيبدأ بيكي وينتهي معاكي، إنتي الحلم اللي تمنيته من ربنا واستجاب.'] },
  { id: 'dream_12', gesture: 'Open_Palm', state: 'surprise', variants: ['نامي في أمان ورعاية الرحمن يا عائشة، بكرة يوم جديد كله أمل وخير لينا.'] },
  { id: 'dream_13', gesture: 'Thumb_Up', state: 'happy', variants: ['بتخيل فنجان القهوة الصبح معاكي في البلكونة وإحنا بنخطط ليومنا سوا في الحلال.'] },
  { id: 'dream_14', gesture: 'Pointing_Up', state: 'reading', variants: ['يا عائشة، صوتك ورسايلك هما الدفء اللي بيحلي أيامي الباردة.. تصبحي على حب وسعادة.'] },

  // Set 3: Bedtime Guardian & Future Promises (15-21)
  { id: 'dream_15', gesture: 'Victory', state: 'happy', variants: ['بكره الأحلام البعيدة تبقى واقع نعيشه كل يوم، والصبر اللي صبرناه ربنا يجازينا عليه خير.'] },
  { id: 'dream_16', gesture: 'ILoveYou', state: 'love', variants: ['إنتي الحلم الوحيد اللي مش عاوز أصحى منه أبداً، ربنا يديمك وجودك في واقعي وحياتي.'] },
  { id: 'dream_17', gesture: 'Closed_Fist', state: 'shy', variants: ['يا ملاكي الصغير، ربنا يبعتلك أحلام سعيدة ومريحة تنسيكي كل تعب اليوم.'] },
  { id: 'dream_18', gesture: 'Open_Palm', state: 'surprise', variants: ['في كل ليلة، ببعتلك مع النجوم دعوة صادقة تحفظك وتجيبلك كل خير وراحة لبالك.'] },
  { id: 'dream_19', gesture: 'Thumb_Up', state: 'happy', variants: ['كل خطوة في طريقنا ده بتقربنا لحياة هادية وجميلة مليانة مودة ورحمة وطاعة لربنا.'] },
  { id: 'dream_20', gesture: 'Pointing_Up', state: 'reading', variants: ['يا طيبة الملامح والقلب، استودعتك الله الذي لا تضيع ودائعه ونوم العافية ليكي.'] },
  { id: 'dream_21', gesture: 'Victory', state: 'happy', variants: ['رسايل الأحلام خلصت، بس وعد عليا أحول كل الأحلام دي لواقع تعيشيه بسعادة وحلال معايا.'] }
];

export const FINAL_SECRET_ULTIMATE: FinalSecret = {
  state: ['love', 'sleep'],
  message: 'يا رفيقة دربي، يا أجمل اختياراتي وأعظم أرزاقي.. النهارده إنتي فتحتي كل الرسائل، وكل الأسرار اللي في قلبي، بس الحقيقة إن حبي ليكي ملوش نهاية وملوش حد. الأبلكيشن ده كان مجرد مساحة صغيرة عشان أقولك فيها إني بحبك في كل أحوالك، وإني دايماً فخور بيكي. شكراً على كل لحظة، وكل دعوة، وكل ضحكة بيننا. بدعي ربنا يجمعنا على خير قريب أوي، ونعيش كل اللي باقي من عمرنا سوا، حلال وفي طاعة ربنا. بحبك يا عائشة.. بحبك أكتر من أي كلام.'
};

export const getFinalSecret = (mode: 'soul' | 'heart' | 'sparkle' | 'dream', isUltimate: boolean = false, unlockedCount: number = 7) => {
  if (isUltimate) return FINAL_SECRET_ULTIMATE;
  
  const setIndex = Math.max(0, Math.floor((unlockedCount - 1) / 7));
  
  let finalesArray;
  switch(mode) {
    case 'heart': finalesArray = FINALES_HEART; break;
    case 'sparkle': finalesArray = FINALES_SPARKLE; break;
    case 'dream': finalesArray = FINALES_DREAM; break;
    case 'soul':
    default: finalesArray = FINALES_SOUL; break;
  }

  if (!finalesArray || finalesArray.length === 0) {
    return FINAL_SECRET_ULTIMATE;
  }
  return finalesArray[Math.min(setIndex, finalesArray.length - 1)];
};

export const getSecrets = (mode: 'soul' | 'heart' | 'sparkle' | 'dream') => {
  switch(mode) {
    case 'heart': return SECRETS_HEART;
    case 'sparkle': return SECRETS_SPARKLE;
    case 'dream': return SECRETS_DREAM;
    case 'soul':
    default: return SECRETS_SOUL;
  }
};
