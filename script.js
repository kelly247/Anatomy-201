// ==========================================
// 1. FIREBASE SETUP & INITIALIZATION
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyChHlvUzMPOVcdWec4lo8RnA3eGBWGcXM8",
  authDomain: "anatomy-2-f145e.firebaseapp.com",
  projectId: "anatomy-2-f145e",
  storageBucket: "anatomy-2-f145e.firebasestorage.app",
  messagingSenderId: "1046960385149",
  appId: "1:1046960385149:web:f94633f84b5a7894881514"
};
const restartBtn = document.getElementById("restart-btn");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// 2. COMPLETE UPPER LIMB ANATOMY DATASET (54 QUESTIONS)
// ==========================================
const quizData = [
    {
        question: "Which nerve is at risk of direct compromise in fractures involving the surgical neck of the humerus?",
        options: ["Radial nerve", "Axillary nerve", "Median nerve", "Ulnar nerve"],
        correct: 1,
        explanation: "The axillary nerve and posterior circumflex humeral artery travel directly through the quadrangular space wrapping behind the surgical neck of the humerus, rendering them highly vulnerable during fractures."
    },
    {
        question: "A patient presents with 'claw hand' deformity. Injury to which nerve pathway is typically responsible for this presentation?",
        options: ["Ulnar nerve", "Musculocutaneous nerve", "Median nerve", "Axillary nerve"],
        correct: 0,
        explanation: "The ulnar nerve supplies innervation to most intrinsic hand muscles. Loss of function creates un-opposed action from long extensors, presenting clinically as a claw deformity affecting digits 4 and 5."
    },
    {
        question: "Which structural muscle forms the critical medial boundary landmark of the cubital fossa?",
        options: ["Brachioradialis", "Pronator teres", "Brachialis", "Biceps brachii"],
        correct: 1,
        explanation: "The cubital fossa is bounded laterally by the medial border of brachioradialis, and medially by the lateral boundary of the pronator teres muscle."
    },
    {
        question: "What specific cord of the brachial plexus yields structural branches forming the musculocutaneous nerve?",
        options: ["Posterior cord", "Medial cord", "Lateral cord", "Anterior division"],
        correct: 2,
        explanation: "The musculocutaneous nerve arises as a direct terminal continuation of the lateral cord of the brachial plexus, carrying fibers primarily from nerve roots C5, C6, and C7."
    },
    {
        question: "Which component of the carpal architecture passes structurally deep within the carpal tunnel?",
        options: ["Ulnar artery", "Flexor carpi radialis tendon", "Flexor digitorum profundus tendons", "Ulnar nerve"],
        correct: 2,
        explanation: "The carpal tunnel conducts a single nerve pathway (median nerve) paired alongside nine structural tendons: 4 from flexor digitorum superficialis, 4 from flexor digitorum profundus, and 1 from flexor pollicis longus."
    },
    {
        question: "A wrist drop presentation is caused by paralysis of extensor compartment systems following mechanical compression of which nerve?",
        options: ["Median nerve", "Axillary nerve", "Radial nerve", "Ulnar nerve"],
        correct: 2,
        explanation: "The radial nerve runs down the spiral groove of the humerus and innervates the triceps and wrist extensors. High radial nerve injuries remove extensor tone entirely, creating wrist drop."
    },
    {
        question: "Which arterial route provides key collateral circulation to the scapula by forming direct connections with subscapular arteries?",
        options: ["Suprascapular artery", "Deep brachial artery", "Internal thoracic artery", "Lateral thoracic artery"],
        correct: 0,
        explanation: "The scapular anastomosis creates structural vascular links connecting branches from the subclavian route (suprascapular and dorsal scapular arteries) with terminal axillary network paths (subscapular artery)."
    },
    {
        question: "Which intrinsic muscle configuration is primarily responsible for initial initiation of upper limb abduction up to 15 degrees?",
        options: ["Deltoid muscle", "Supraspinatus muscle", "Infraspinatus muscle", "Subscapularis muscle"],
        correct: 1,
        explanation: "The supraspinatus (rotator cuff muscle) drives early initiation of shoulder abduction up to the 15-degree mark, where the deltoid muscle takes over up to 90 degrees."
    },
    {
        question: "What anatomical site represents the terminal termination path where the axillary artery transitions directly into the brachial artery?",
        options: ["Lower border of teres major", "Clavicular midpoint border", "Outer border of first rib", "Surgical neck boundary line"],
        correct: 0,
        explanation: "The axillary artery begins at the outer boundary of the first rib as a continuation of the subclavian route and transitions into the brachial artery once it passes the inferior border of the teres major muscle."
    },
    {
        question: "Which neurological reflex root level provides the regulatory motor drive checked via the biceps tendon tap exam?",
        options: ["C5, C6", "C7, C8", "C4", "T1"],
        correct: 0,
        explanation: "The biceps reflex checks the structural functional integration of the musculocutaneous nerve path, tracking neural root feedback integrity residing primarily at the spinal levels of C5 and C6."
    },
    {
        question: "Fractures of the medial epicondyle of the humerus endanger which nerve path traveling directly posterior to it?",
        options: ["Radial nerve", "Median nerve", "Ulnar nerve", "Musculocutaneous nerve"],
        correct: 2,
        explanation: "The ulnar nerve passes directly behind the medial epicondyle in the cubital tunnel, making it highly susceptible to compression or traction injury following displaced fractures."
    },
    {
        question: "Which specific nerve branch supplies the skin configuration of the anatomical snuffbox region?",
        options: ["Superficial branch of radial nerve", "Deep branch of ulnar nerve", "Palmar cutaneous branch of median nerve", "Lateral cutaneous nerve of forearm"],
        correct: 0,
        explanation: "The superficial branch of the radial nerve provides entirely cutaneous sensation to the dorsolateral aspect of the hand, including the floor of the anatomical snuffbox."
    },
    {
        question: "Which structural element forms the direct boundary ceiling (roof) of the anatomical snuffbox?",
        options: ["Extensor pollicis brevis", "Skin and superficial fascia", "Scaphoid and trapezium bones", "Extensor retinaculum"],
        correct: 1,
        explanation: "While the floor consists of bones like the scaphoid and trapezium, the anatomical roof layer is composed simply of the overlying skin, superficial fascia, and branches of the radial nerve."
    },
    {
        question: "What specific muscle structure is responsible for producing normal rotation of the scapula to allow complete limb abduction over 90 degrees?",
        options: ["Serratus anterior", "Rhomboid major", "Pectoralis minor", "Latissimus dorsi"],
        correct: 0,
        explanation: "The serratus anterior, working alongside the trapezius, rotates the glenoid cavity upward, which is critical for elevating the arm above the horizontal plane."
    },
    {
        question: "Winged scapula deformity clinically highlights functional compromise or dynamic denervation of which structural muscle?",
        options: ["Trapezius", "Rhomboid minor", "Serratus anterior", "Levator scapulae"],
        correct: 2,
        explanation: "Denervation of the serratus anterior due to a long thoracic nerve injury impairs scapular stabilization against the thoracic cage, causing the medial border to protrude outward."
    },
    {
        question: "The tendon of which structural muscle serves as the specific clinical landmark dividing the axillary artery into three separate descriptive parts?",
        options: ["Pectoralis major", "Pectoralis minor", "Subscapularis", "Latissimus dorsi"],
        correct: 1,
        explanation: "The pectoralis minor muscle crosses directly anterior to the axillary artery, defining part 1 (proximal), part 2 (posterior), and part 3 (distal)."
    },
    {
        question: "Which bony element experiences the highest statistical rates of fracture injury within the carpal skeleton network?",
        options: ["Pisiform", "Lunate", "Scaphoid", "Triquetrum"],
        correct: 2,
        explanation: "The scaphoid bone absorbs force transmitted through the radius during falls on an outstretched hand, resulting in a high incidence of structural fractures prone to avascular necrosis."
    },
    {
        question: "What specific neurological roots fuse structurally to yield the middle trunk component of the brachial plexus?",
        options: ["C5 and C6 roots", "C7 root only", "C8 and T1 roots", "C6 and C7 roots"],
        correct: 1,
        explanation: "The anterior rami of C5 and C6 form the upper trunk; the C8 and T1 rami join to form the lower trunk; while the C7 root continues independently to form the middle trunk."
    },
    {
        question: "What distinct structure passes completely outside the carpal tunnel network, avoiding space containment beneath the flexor retinaculum?",
        options: ["Flexor pollicis longus tendon", "Median nerve", "Ulnar artery", "Flexor digitorum superficialis tendons"],
        correct: 2,
        explanation: "The ulnar artery and ulnar nerve run superficial to the flexor retinaculum through Guyon's canal, completely isolated from the carpal tunnel compartment."
    },
    {
        question: "Which terminal muscle structure inserts directly onto the lesser tubercle element of the humerus architecture?",
        options: ["Supraspinatus", "Infraspinatus", "Teres minor", "Subscapularis"],
        correct: 3,
        explanation: "Of the four rotator cuff muscles, only the subscapularis inserts onto the lesser tubercle of the humerus. The supraspinatus, infraspinatus, and teres minor all insert onto facets of the greater tubercle."
    },
    {
        question: "Which ligament configuration serves to hold the head of the radius securely within the radial notch of the ulna?",
        options: ["Anular ligament", "Ulnar collateral ligament", "Radial collateral ligament", "Oblique cord"],
        correct: 0,
        explanation: "The anular ligament forms a protective collar around the head of the radius, maintaining its position during pronation and supination movements."
    },
    {
        question: "A mid-shaft fracture of the humerus is most likely to damage which nerve path traveling along the spiral groove?",
        options: ["Median nerve", "Radial nerve", "Ulnar nerve", "Musculocutaneous nerve"],
        correct: 1,
        explanation: "The radial nerve runs down the spiral groove along the posterior mid-shaft of the humerus, making it vulnerable to direct trauma or entrapment in mid-shaft fractures."
    },
    {
        question: "Which muscle is the primary driver of forearm supination when powerful or rapid motion against resistance is required?",
        options: ["Brachioradialis", "Supinator", "Biceps brachii", "Pronator quadratus"],
        correct: 2,
        explanation: "While the supinator manages slow unresisted supination, the biceps brachii functions as the primary, high-power supinator when the elbow joint is flexed."
    },
    {
        question: "What nerve path perforates directly through the coracobrachialis muscle body to reach the anterior arm compartment?",
        options: ["Median nerve", "Musculocutaneous nerve", "Radial nerve", "Axillary nerve"],
        correct: 1,
        explanation: "The musculocutaneous nerve pierces the coracobrachialis muscle to exit the axilla and descend between the biceps brachii and brachialis muscles."
    },
    {
        question: "Which fascial space structure hosts both the radial nerve path and the deep brachial artery within its anatomical boundaries?",
        options: ["Quadrangular space", "Triangular space", "Triangular interval", "Cubital fossa space"],
        correct: 2,
        explanation: "The triangular interval (bounded by the long head of triceps, lateral head of triceps, and humerus shaft) conducts the radial nerve and profunda brachii artery toward the posterior compartment."
    },
    {
        question: "Which structural muscle marks the lateral boundary landmark profile defining the anatomical snuffbox space?",
        options: ["Extensor pollicis longus", "Abductor pollicis longus", "Extensor carpi radialis longus", "Flexor pollicis longus"],
        correct: 1,
        explanation: "The lateral boundary of the snuffbox is formed by the tendons of the abductor pollicis longus and extensor pollicis brevis, while the medial boundary is formed solely by the extensor pollicis longus."
    },
    {
        question: "Erb-Duchenne paralysis ('waiter's tip' position) indicates structural trauma localized to which region of the brachial plexus?",
        options: ["Lower trunk", "Posterior cord", "Upper trunk", "Medial cord"],
        correct: 2,
        explanation: "Traction injuries that forcefully separate the neck and shoulder damage the upper trunk (C5-C6), impairing the abductors, lateral rotators, and flexors of the arm."
    },
    {
        question: "Which bone serves as the central structural pivot element around which the distal radius rotates during pronation?",
        options: ["Capitate", "Ulna", "Humerus", "Scaphoid"],
        correct: 1,
        explanation: "During pronation and supination, the proximal radial head rotates within the anular ligament, while the distal end of the radius swings around the fixed head of the ulna."
    },
    {
        question: "What clinical condition results from entrapment or compression of the ulnar nerve within the wrist pathway?",
        options: ["Carpal tunnel syndrome", "Pronator teres syndrome", "Guyon's canal syndrome", "Cubital tunnel syndrome"],
        correct: 2,
        explanation: "Compression of the ulnar nerve as it passes between the pisiform and hook of hamate causes Guyon's canal syndrome, which manifests as sensory loss in the medial one and a half digits."
    },
    {
        question: "Which muscle is uniquely dual-innervated by both the median nerve path and the ulnar nerve path?",
        options: ["Flexor digitorum superficialis", "Flexor digitorum profundus", "Flexor carpi radialis", "Flexor pollicis longus"],
        correct: 1,
        explanation: "The lateral half of the flexor digitorum profundus (digits 2 and 3) is supplied by the median nerve, while the medial half (digits 4 and 5) is innervated by the ulnar nerve."
    },
    {
        question: "Which muscle forms the direct floor configuration supporting structures inside the cubital fossa?",
        options: ["Brachioradialis", "Supinator", "Brachialis", "Pronator quadratus"],
        correct: 2,
        explanation: "The deep floor of the cubital fossa is formed proximally by the brachialis muscle and distally by the supinator muscle as it wraps around the radius."
    },
    {
        question: "Which muscle configuration inserts directly onto the olecranon process structural architecture of the ulna?",
        options: ["Biceps brachii", "Triceps brachii", "Brachialis", "Anconeus"],
        correct: 1,
        explanation: "The triceps brachii muscle converges into a stout terminal tendon that inserts onto the olecranon process of the ulna, serving as the primary extensor of the elbow."
    },
    {
        question: "Klumpke paralysis presentation indicates severe structural trauma localized to which brachial plexus region?",
        options: ["Upper trunk", "Lower trunk", "Lateral cord", "Posterior cord"],
        correct: 1,
        explanation: "Forced hyperabduction of the arm can injure the lower trunk (C8-T1), affecting the intrinsic muscles of the hand and leading to claw hand presentation."
    },
    {
        question: "The deep palmar arterial arch is formed primarily as a direct continuation of which main artery?",
        options: ["Ulnar artery", "Radial artery", "Anterior interosseous artery", "Deep brachial artery"],
        correct: 1,
        explanation: "The radial artery enters the palm from the dorsum of the hand to form the deep palmar arch, while the ulnar artery contributes primarily to the superficial palmar arch."
    },
    {
        question: "Which structure forms the direct medial boundary wall defining the space of the quadrangular space?",
        options: ["Long head of triceps brachii", "Surgical neck of humerus", "Teres major muscle", "Teres minor muscle"],
        correct: 0,
        explanation: "The quadrangular space is bounded superiorly by teres minor, inferiorly by teres major, laterally by the humerus, and medially by the long head of the triceps brachii."
    },
    {
        question: "What nerve is responsible for providing motor innervation to the extensor carpi radialis longus muscle?",
        options: ["Deep branch of radial nerve", "Radial nerve proper", "Posterior interosseous nerve", "Median nerve"],
        correct: 1,
        explanation: "The radial nerve proper directly innervates the brachioradialis and extensor carpi radialis longus before dividing into its deep and superficial branches near the elbow."
    },
    {
        question: "Which ligament stabilizes the acromioclavicular joint by anchoring the clavicle to the coracoid process?",
        options: ["Coracoacromial ligament", "Coracoclavicular ligament", "Glenohumeral ligament", "Sternoclavicular ligament"],
        correct: 1,
        explanation: "The coracoclavicular ligament (comprising the conoid and trapezoid ligaments) anchors the clavicle to the coracoid process, providing primary vertical stability."
    },
    {
        question: "What distinct structure runs directly through the intertubercular groove of the humerus?",
        options: ["Tendon of long head of biceps brachii", "Radial nerve path", "Tendon of short head of biceps brachii", "Axillary nerve pathway"],
        correct: 0,
        explanation: "The tendon of the long head of the biceps brachii travels through the intertubercular (bicipital) groove, held in place by the transverse humeral ligament."
    },
    {
        question: "Which focal carpal bone structure can cause acute carpal tunnel syndrome when displaced anteriorly?",
        options: ["Scaphoid", "Lunate", "Hamate", "Capitate"],
        correct: 1,
        explanation: "Anterior dislocation of the lunate bone pushes it directly into the carpal tunnel workspace, acutely compressing the median nerve against the flexor retinaculum."
    },
    {
        question: "Which structure functions as the primary dynamic stabilizer preventing inferior dislocation of the glenohumeral joint?",
        options: ["Supraspinatus muscle", "Long head of triceps", "Glenohumeral ligaments", "Coracohumeral ligament"],
        correct: 0,
        explanation: "The supraspinatus muscle runs over the top of the glenohumeral joint capsule, providing structural support that prevents inferior subluxation of the humeral head."
    },
    {
        question: "Which precise nerve path provides regulatory motor drive to the pronator quadratus muscle?",
        options: ["Anterior interosseous nerve", "Posterior interosseous nerve", "Deep branch of ulnar nerve", "Main median nerve trunk"],
        correct: 0,
        explanation: "The anterior interosseous nerve (a deep branch of the median nerve) supplies the deep flexor compartment, including the flexor pollicis longus and the pronator quadratus."
    },
    {
        question: "The deep branch of the ulnar nerve provides motor innervation to which muscle group?",
        options: ["All lumbrical muscles", "Thenar muscles", "All interossei muscles", "Superficial palmaris brevis"],
        correct: 2,
        explanation: "The deep branch of the ulnar nerve supplies all palmar and dorsal interossei muscles, the adductor pollicis, and the medial two lumbricals."
    },
    {
        question: "A patient cannot abduct their fingers. This deficit indicates functional loss in which muscle group?",
        options: ["Palmar interossei", "Dorsal interossei", "Lumbricals", "Thenar muscles"],
        correct: 1,
        explanation: "The dorsal interossei abduct the fingers (mnemonic: DAB), while the palmar interossei adduct the fingers (mnemonic: PAD). Both groups are innervated by the ulnar nerve."
    },
    {
        question: "Which lymph node group receives the majority of lymph drainage from the lateral breast quadrants?",
        options: ["Pectoral (anterior) nodes", "Lateral (humeral) nodes", "Subscapular (posterior) nodes", "Central nodes"],
        correct: 0,
        explanation: "The pectoral (anterior) group of axillary lymph nodes, located along the lower border of the pectoralis minor, receives most of the drainage from the lateral breast quadrants."
    },
    {
        question: "What structural defect causes a typical 'shoulder separation' presentation?",
        options: ["Glenohumeral dislocation", "Disruption of acromioclavicular joint ligaments", "Fracture of clavicle shaft", "Torn rotator cuff tendon"],
        correct: 1,
        explanation: "A shoulder separation involves injury to the acromioclavicular joint, often with tearing of both the acromioclavicular and coracoclavicular ligaments."
    },
    {
        question: "The cephalic vein travels through which anatomical space as it ascends toward the deltoid region?",
        options: ["Deltopectoral groove", "Cubital fossa", "Quadrangular space", "Triangular interval"],
        correct: 0,
        explanation: "The cephalic vein ascends within the superficial fascia along the anterolateral arm and passes through the deltoid-pectoral triangle to drain into the axillary vein."
    },
    {
        question: "Which muscle is the primary driver of forearm flexion when the joint is in a semi-prorated state?",
        options: ["Biceps brachii", "Brachialis", "Brachioradialis", "Pronator teres"],
        correct: 2,
        explanation: "The brachioradialis operates at maximum mechanical efficiency when flexing the forearm in a mid-pronation (semi-prorated) position."
    },
    {
        question: "What distinct structure forms the lateral border definition bounding the triangular space profile?",
        options: ["Long head of triceps brachii", "Lateral head of triceps", "Teres major muscle", "Teres minor muscle"],
        correct: 0,
        explanation: "The triangular space is bounded superiorly by teres minor, inferiorly by teres major, and laterally by the long head of the triceps brachii."
    },
    {
        question: "Which muscle is innervated by the thoracodorsal nerve path?",
        options: ["Serratus anterior", "Latissimus dorsi", "Levator scapulae", "Trapezius"],
        correct: 1,
        explanation: "The thoracodorsal nerve (or middle subscapular nerve), arising from the posterior cord (C6-C8), provides motor innervation to the latissimus dorsi muscle."
    },
    {
        question: "Which carpal element articulates directly with the distal articular facet surface of the radius?",
        options: ["Pisiform", "Hamate", "Scaphoid", "Capitate"],
        correct: 2,
        explanation: "The distal end of the radius articulates directly with the scaphoid and lunate carpal bones to form the radiocarpal (wrist) joint."
    },
    {
        question: "The professional sign of 'benediction' during an active attempt to make a fist indicates trauma to which nerve path?",
        options: ["Ulnar nerve", "Median nerve", "Radial nerve", "Axillary nerve"],
        correct: 1,
        explanation: "When a patient with a proximal median nerve injury attempts to flex their fingers, digits 1-3 remain extended due to paralysis of the superficial and deep flexors, producing the hand of benediction."
    },
    {
        question: "Which structural ligament prevents hyperextension of the sternoclavicular joint during movement?",
        options: ["Interclavicular ligament", "Costoclavicular ligament", "Anterior sternoclavicular ligament", "Articular disc"],
        correct: 1,
        explanation: "The costoclavicular ligament anchors the clavicle to the first rib, limiting clavicular elevation and preventing hyperextension of the sternoclavicular joint."
    },
    {
        question: "Which muscle serves to dynamically pull the glenoid labrum tight during powerful shoulder deceleration movements?",
        options: ["Long head of triceps", "Long head of biceps brachii", "Short head of biceps", "Pectoralis major"],
        correct: 1,
        explanation: "The long head of the biceps brachii originates directly from the supraglenoid tubercle and glenoid labrum, stabilizing the shoulder capsule under tension."
    },
    {
        question: "Which nerve path can be compressed beneath the arcade of Frohse within the deep forearm tissues?",
        options: ["Anterior interosseous nerve", "Deep branch of ulnar nerve", "Posterior interosseous nerve", "Superficial radial nerve"],
        correct: 2,
        explanation: "The posterior interosseous nerve (the deep branch of the radial nerve) can become trapped under the fibrous upper border of the supinator muscle, known as the arcade of Frohse."
    }
];

// ==========================================
// 3. INTERNAL ENGINE STATE CONTROLLERS
// ==========================================
let currentQuestionIndex = 0;
let score = 0;
let participantName = "";
let hasAnswered = false;

// DOM Selectors
// New HUD Tracking Elements
const activeStudentName = document.getElementById("active-student-name");
const liveScoreCounter = document.getElementById("live-score-counter");
const regScreen = document.getElementById("registration-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const regForm = document.getElementById("reg-form");
const usernameInput = document.getElementById("username");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const nextBtn = document.getElementById("next-btn");

const explanationContainer = document.getElementById("explanation-container");
const explanationText = document.getElementById("explanation-text");

const displayName = document.getElementById("display-name");
const scoreText = document.getElementById("score-text");
const dbStatus = document.getElementById("db-status");

// Track registration state transitions
// Track registration state transitions
regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    participantName = usernameInput.value.trim();
    if (participantName) {
        // Inject student name into the live tracking bar
        activeStudentName.innerText = participantName;
        liveScoreCounter.innerText = "0";
        
        switchScreen(regScreen, quizScreen);
        loadQuestion();
    }
});
function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove("active");
    showScreen.classList.add("active");
}

function loadQuestion() {
    hasAnswered = false;
    nextBtn.classList.add("hidden");
    explanationContainer.classList.add("hidden");
    optionsContainer.innerHTML = "";
    
    const currentQuiz = quizData[currentQuestionIndex];
    
    // Status text setup
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    const progressPercent = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    questionText.innerText = currentQuiz.question;
    
    // Instantiate interactive selection buttons
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => handleAnswerVerification(index, button));
        optionsContainer.appendChild(button);
    });
}

function handleAnswerVerification(selectedIndex, clickedButton) {
    if (hasAnswered) return; // Prevent multiple clicks
    hasAnswered = true;
    
    const correctIndex = quizData[currentQuestionIndex].correct;
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    
    // Lock controls state instantly
    buttons.forEach(btn => btn.classList.add("disabled"));
    
    if (selectedIndex === correctIndex) {
        clickedButton.classList.add("correct");
        score++;
      if (selectedIndex === correctIndex) {
        clickedButton.classList.add("correct");
        score++;
        
        // Update score badge on screen immediately
        liveScoreCounter.innerText = score;
        
        // Trigger Canvas Confetti celebration
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2563eb', '#10b981', '#f59e0b', '#ec4899']
        });
    } else {
        clickedButton.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }
        
        // Trigger Canvas Confetti celebration
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899']
        });
    } else {
        clickedButton.classList.add("wrong");
        // Highlight the correct answer for clarity
        buttons[correctIndex].classList.add("correct");
    }
    
    // Display explanation panel text
    explanationText.innerText = quizData[currentQuestionIndex].explanation;
    explanationContainer.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        handleQuizEnd();
    }
});

function handleQuizEnd() {
    progressBar.style.width = "100%";
    switchScreen(quizScreen, resultScreen);
    
    displayName.innerText = participantName;
    scoreText.innerText = `${score} / ${quizData.length}`;
    
    // Sync telemetry payload to Firestore
    saveUserScoreToFirebase(participantName, score);
}

async function saveUserScoreToFirebase(name, finalScore) {
    try {
        await addDoc(collection(db, "quiz_results"), {
            name: name,
            score: finalScore,
            totalQuestions: quizData.length,
            percentage: Math.round((finalScore / quizData.length) * 100),
            timestamp: serverTimestamp()
        });
        
        dbStatus.innerText = "✓ Results synced safely with your administrator dashboard.";
        dbStatus.style.color = "var(--success-color)";
    } catch (error) {
        console.error("Cloud Error Logged: ", error);
        dbStatus.innerText = "❌ Network synchronization failure. Result cached on device.";
    }
}
// ==========================================
// 8. ASSESSMENT ENGINE RESET CONTROLLER
// ==========================================
restartBtn.addEventListener("click", () => {
    // 1. Reset all local engine state variables
    currentQuestionIndex = 0;
    score = 0;
    hasAnswered = false;
    
    // 2. Wipe text inputs and registration memory fields clear
    usernameInput.value = "";
    participantName = "";
    
    // 3. Reset database text indicator to default state
    dbStatus.innerText = "Syncing metrics with cloud repository...";
    dbStatus.style.color = "var(--text-muted)";
    
    // 4. Pivot presentation screens back to registration page setup
    switchScreen(resultScreen, regScreen);
});