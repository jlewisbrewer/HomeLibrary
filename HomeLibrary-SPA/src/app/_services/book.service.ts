import { BookForRegister } from './../_models/bookForRegister';
import { Book } from './../_models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = environment.apiUrl;
  books: BookForRegister[];

  constructor(private http: HttpClient) {
    // this.addBooksToTest();
  }

  // This will have to be changed for specific users
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/');
  }

  getBook(id): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'books/' + id);
  }

  getUserBooks(id): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'users/' + id + '/books/');
  }

  getSearchResults(searchFormValues) {
    return this.http
      .post<any>(this.baseUrl + 'books/search', searchFormValues)
      .pipe(
        map((response: any) => {
          const books = response;
          if (books) {
            // console.log(books);
            this.books = books;
            // console.log("we are here:");
            // console.log(this.books);
          }
        })
      );
  }

  addBookToLibrary(selectedBook) {
    console.log(selectedBook);
    return;
  }

  // addBooksToTest() {
  //   this.books = [
  //     {
  //       title: 'The Darkness That Comes Before',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Abrams',
  //       description:
  //         "Strikingly original in its conception, ambitious in scope, with characters engrossingly and vividly drawn, the first book in R. Scott Bakker's Prince of Nothing series creates a remarkable world from whole cloth-its language and classes of people, its cities, religions, mysteries, taboos, and rituals-the kind of all-embracing universe Tolkien and Herbert created unforgettably in the epic fantasies The Lord of the Rings and Dune. It's a world scarred by an apocalyptic past, evoking a time both two thousand years past and two thousand years into the future, as untold thousands gather for a crusade. Among them, two men and two women are ensnared by a mysterious traveler, Anasûrimbor Kellhus—part warrior, part philosopher, part sorcerous, charismatic presence—from lands long thought dead. The Darkness That Comes Before is a history of this great holy war, and like all histories, the survivors write its conclusion.",
  //       isbn10: '1590203852',
  //       isbn13: '9781590203859',
  //       pageCount: 608,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=gzuEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Disciple of the Dog',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Forge Books',
  //       description:
  //         "Disciple of the Dog, a crime thriller from acclaimed master of speculative fiction R. Scott Bakker \"And you wonder why I'm cynical. I've literally ‘seen it all before.' The truth is we all have, every single one of us past the age of, say, twenty-five. The only difference is that I remember.\" No matter how hard he drinks, gambles, or womanizes, Disciple Manning simply cannot forget: not a word spoken, not an image glimpsed, not a pain suffered. Disciple Manning has total recall. Whatever he hears, he can remember with 100% accuracy. He can play it back in his head for an infinite number of times without a single change. This ability makes him a dangerously unorthodox private investigator. When a New Jersey couple hires Manning to find their daughter, who joined a religious cult before vanishing in a small rust-belt town called Ruddick, he finds himself embroiled in a mystery that will pit his unnatural ability to remember against his desperate desire to forget. At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.",
  //       isbn10: '9781429925365',
  //       isbn13: '1429925361',
  //       pageCount: 288,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=NoDP5Y68lssC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'The Unholy Consult',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Abrams',
  //       description:
  //         'In this shattering conclusion to The Aspect-Emperor books, praised for their “sweeping epic scale and detailed historical world-building†? (Grimdark Magazine), R. Scott Bakker delivers the feverishly harrowing and long-awaited finish to a story cycle that has stretched across seven books in two series.In The Unholy Consult, the Men of the Great Ordeal have been abandoned by Anasûrimbor Kellhus, and the grand crusade has devolved into cannibalism and chaos. When Exalt-General Proyas, with Prince-Imperial Kayutas at his side, attempts to gain control of the lost Men and continue their march to Golgotterath, it rapidly becomes clear that the lost Lord-and-Prophet is not so easily shaken from the mission. When Sorweel, the Believer-King of Sakarpus, and Serwa, daughter of the Aspect-Emperor, join the Great Ordeal, they discover that the shortest path is not always the most obvious, or the safest. Souls, morality, and relationships are called into question when no one can be trusted, and the price for their sins is greater than they imagined. An uncompromising portrayal of a catastrophic world of myth, war, and sorcery, the scope and creativity of the Aspect-Emperor books stand alongside George R. R. Martin’s A Song of Ice and Fire. Powerful and haunting, this thrilling final installment of Bakker’s groundbreaking series promises to be one of the most talked about epic fantasy books of all time.',
  //       isbn10: '1468314874',
  //       isbn13: '9781468314878',
  //       pageCount: 512,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=k8SGDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Neuropath',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Macmillan',
  //       description:
  //         "Tom's best friend Neil worked for the National Security Agency, cracking the minds of suspected terrorists. Now it is Neil himself who has cracked and gone AWOL--what's more, he has left behind evidence that he has been employing his unique skills on civi",
  //       isbn10: '9780765321893',
  //       isbn13: '0765321890',
  //       pageCount: 316,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=VEHt2F3YE68C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'The White-Luck Warrior',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Abrams',
  //       description:
  //         'Praised by readers and critics around the world, R. Scott Bakker has become one of the most celebrated voices in fantasy fiction. The Aspect-Emperor trilogy follows on from the acclaimed Prince of Nothing saga, and The White-Luck Warrior is the chilling second book in the new series. Ruler Anasurimbor Kellhus and his Great Ordeal march ever farther into the Ancient North, as his consort Esmenet finds herself at war. Exiled wizard Achamian, meanwhile, leads his own ragtag mission to the legendary ruins of Sauglish. Into this tumult walks the White-Luck Warrior, assassin and messiah both . . . . . . In this ambitious volume, Bakker delves even further into his richly imagined universe of myth, violence, and sorcery.',
  //       isbn10: '1468300938',
  //       isbn13: '9781468300932',
  //       pageCount: 608,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=aRKEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'The Judging Eye',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Abrams',
  //       description:
  //         "Now he returns to The Prince of Nothing universe with the long-awaited The Judging Eye, the first book in an all-new series. Set twenty years after the end of The Thousandfold Thought, Bakker reintroduces us to a world that is at once familiar but also very different than the one readers thought they knew. Delving even further into his richly imagined universe of myth, violence, and sorcery, and fully remolding the fantasy genre to broaden the scope of intricacy and meaning, R. Scott Bakker has once again written a fantasy novel that defies all expectations and rewards the reader with an experience unlike any to be had in the canon of today's literature.",
  //       isbn10: '1590207459',
  //       isbn13: '9781590207451',
  //       pageCount: 448,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=2ziIDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'The Warrior Prophet',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Abrams',
  //       description:
  //         'The first battle against the heathen has been won, but while the Great Names plot and squabble over the spoils, Kellhus patiently extends his influence, drawing more followers to his banner. The sorcerer Achamian and his lover, Esmenet, submit entirely, only to have their faith tested in unimaginable ways. The warrior Cnaiur falls ever deeper into madness. The skin-spies of the Consult watch with growing trepidation. And as the vast host of the Holy War endures its sternest test in the searing wastes of the desert, a name - a title - begins to be whispered amongst the faithful. But who is the Warrior-Prophet: a dangerous heretic, who turns brother against brother? Or the only man who can avert the Second Apocalypse? The Holy War stands on a knife edge. If all is not to be lost the great powers will have to choose between their most desperate desires and their most ingrained prejudice. Between hatred and hope. Between the Warrior-Prophet and the end of the world...',
  //       isbn10: '1590203879',
  //       isbn13: '9781590203873',
  //       pageCount: 624,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=hzuEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'The Thousandfold Thought',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Abrams',
  //       description:
  //         'All opposition to the man once derided as the Prince of Nothing has vanished or been vanquished. Their leaders slain, the heathen Fanim have fled in disarray. One final march will bring the Holy War to the fabled city of Shimeh. But so very much has changed. Anasurimbor Kellhus, the Warrior-Prophet, now leads the Men of the Tusk. The cuckolded sorcerer Achamian serves as his tutor, betraying his school to keep safe the man he believes can prevent the Second Apocalypse. The Scylvendi barbarian, Cnaiur, succumbs finally to madness. The Consult, sensing the endgame of millennia of planning, work frantically to prepare for the coming of the No-God. The final reckoning is at hand. Faceless assassins will strike in the dead of night. Kings and Emperors will fall. The sorcerous Schools will be unleashed. And Anasurimbor Kellhus will at last confront his father and the dread revelation of the Thousandfold Thought.',
  //       isbn10: '1590206266',
  //       isbn13: '9781590206263',
  //       pageCount: 544,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=nTuEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Catheter Ablation',
  //       author: 'Kenzo Hirao',
  //       publisher: 'Springer',
  //       description:
  //         'This book provides cutting-edge theories and techniques for catheter ablation of all kinds of tachyarrhythmias. Catheter ablation has been a main therapeutic method for tachyarrhythmias for more than thirty years now, and countless operations have been successfully performed. It is crucial for electrophysiologists to diagnose arrhythmia mechanisms correctly and to optimize ablation methods, especially in Japan, one of the world’s fastest-aging countries and where many of this book’s authors are based. The volume is divided into eight parts. The first three parts present the basic theories and novel insights essential to diagnosing and performing catheter ablations. In turn, the latter five parts highlight practical ablation methods in the context of frequently encountered arrhythmias cases, as well as rare ones such as chanellopathies. Written for electrophysiologists who treat patients with cardiac arrhythmias, the book offers readers essential tips and tricks for the optimal treatment of arrhythmias.',
  //       isbn10: '9811044635',
  //       isbn13: '9789811044632',
  //       pageCount: 390,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=ocFHDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'The Great Ordeal',
  //       author: 'R. Scott Bakker',
  //       publisher: 'Harry N. Abrams',
  //       description:
  //         'The "terrifying and astonishing" (Ian C. Esselmont) third installment of R. Scott Bakker\'s acclaimed series',
  //       isbn10: '9781468314885',
  //       isbn13: '1468314882',
  //       pageCount: 512,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=W-VEvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
  //     },
  //     {
  //       title: 'Therapeutic Targets',
  //       author: 'Luis M. Botana',
  //       publisher: 'John Wiley & Sons',
  //       description:
  //         "The Latest Applications For Cellmechanism Research in Drug Discovery Designed to connect research on cell mechanisms with the drug discovery process, Therapeutic Targets: Modulation, Inhibition, and Activation introduces readers to a range of new concepts and novel approaches to drug screening and therapeutic drug targeting to help inform future avenues of drug research. Highly topical, this accessible edited volume features chapters contributed by respected experts from around the globe. The book helps postgraduate students and professional scientists working in academia and industry understand the molecular mechanisms of pharmacology, current pharmacological knowledge, and future perspectives in drug discovery, focusing on important biochemical protein targets and drug targeting strategies for specific diseases. Examining the pharmacology of therapeutically undefined targets and their potential applications, it includes chapters on traditional therapeutic targets, including enzymes (phosphodiesterases and proteases), ion channels, and G protein-coupled receptors, as well as more recently identified avenues of exploration, such as lipids, nuclear receptors, gene promoters, and more. Since different diseases require different targeting techniques, the book also includes dedicated chapters on strategies for investigating Alzheimer's, diabetes, pain, and inflammation treatments. Concluding with a cross-sectional look at new approaches in drug screening, Therapeutic Targets is an invaluable resource for understanding where the next generation of drugs are likely to emerge.",
  //       isbn10: '1118185528',
  //       isbn13: '9781118185520',
  //       pageCount: 494,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=3XJ8PXFCXq4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Insect Control',
  //       author: 'Lawrence I. Gilbert',
  //       publisher: 'Academic Press',
  //       description:
  //         'The publication of the extensive 7-volume work Comprehensive Molecular Insect Science provided library customers and their end-users with a complete reference encompassing important developments and achievements in modern insect science, including reviews on the ecdysone receptor, lipocalins, and bacterial toxins. One of the most popular areas in entomology is control, and this derivative work, Insect Control, taps into a previously unapproached market – the end user who desires to purchase a comprehensive yet affordable work on important aspects of this topic. Contents will include timeless articles covering insect growth- and development-disrupting insecticides, mechanisms and use of Bacillus thuringiensis, biology and genomics of polydnaviruses, pheromones: function and use in insect control, and more. New summaries for each chapter will give an overview of developments in the related article since its original publication. Articles selected by the known and respected editor-in-chief and co-editor of the original MRW The articles are classic reviews offering broad coverage of essential topics in insect control, with special addenda including author notes on the chapter since its original publication Introduction by the editors puts the selected body of work in context for this volume, highlighting the need for entomologists and related researchers to have these reviews in their personal collection',
  //       isbn10: '9780123814500',
  //       isbn13: '0123814502',
  //       pageCount: 490,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=nd2euFHjQyQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Ulcers of the Lower Extremity',
  //       author: 'Ajay K Khanna',
  //       publisher: 'Springer',
  //       description:
  //         'This book focuses on the clinical evaluation and management of ulcers of the lower limbs. There are numerous causes for ulceration in the lower limbs and each variety requires careful clinical evaluation and management approach. In 29 chapters, written by highly experienced surgeons, the book covers prevalence, types, healing mechanisms, clinical evaluation and microbiology of the ulcers, followed by detailed review of each ulcer variety. Chapters on pyoderma gangrenosum, diabetic foot, grafts and flaps, amputation, pain control strategy and documentation of these cases provide a complete coverage from management stand-point. The book is essential reading not only for general surgeons and vascular surgeons, but also has relevance for orthopedic surgeons, podiatrists, dermatologists and oncologists who manage such cases. Also serves as reference guide for post-graduate examination.',
  //       isbn10: '8132226356',
  //       isbn13: '9788132226352',
  //       pageCount: 479,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=keNlCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Severe Trauma and Sepsis',
  //       author: 'Xiaobing Fu',
  //       publisher: 'Springer',
  //       description:
  //         'This book discusses recent progress in organ damage and tissue repair following severe trauma and sepsis. In part 1, it introduces the theory and clinical practice in organ damage. In part 2, it covers all the subjects of sepsis, ranging from mechanism, inflammation, and infection to the lung injury and neonatal sepsis. In part 3, it discusses 4 new advances techniques in tissue repair. There are 20 chapters contributed by experts in each area. This book is a valuable reference for scientists and clinicians to know the new knowledge and technology in severe trauma and sepsis, which will benefit their work in research and clinic through multidisciplinary collaboration.',
  //       isbn10: '981133353X',
  //       isbn13: '9789811333538',
  //       pageCount: 389,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=HXmaDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Music of a Life',
  //       author: 'Andreï Makine',
  //       publisher: 'Skyhorse Publishing, Inc.',
  //       description:
  //         'A brief but extraordinarily powerful novel by the author of Dreams of My Russian Summers and Requiem for a Lost Empire, Music of a Life is set in the period just before, and two decades after, World War II. Alexeï Berg’s father is a well-known dramatist, his mother a famous opera singer. But during Stalin’s reign of terror in the 1930s they, like millions of other Russians, come under attack for their presumed lack of political purity. Harassed and proscribed, they have nonetheless, on the eve of Hitler’s war, not yet been arrested. And young Alexeï himself, a budding classical pianist, has been allowed to continue his musical studies. His first solo concert is scheduled for May 24, 1941. Two days before the concert, on his way home from his final rehearsal, he sees his parents being arrested, taken from their Moscow apartment. Knowing his own arrest will not be far behind, Alexeï flees to the country house of his fiancée, where again betrayal awaits him. He flees, one step ahead of the dreaded secret police until, taking on the identity of a dead soldier, he enlists in the Soviet army. Thus begins his seemingly endless journey, through war and peace, until he lands, two decades later, in a snowbound train station in the Urals, where he relates his harrowing saga to the novel’s narrator. An international bestseller, Music of a Life is, in the words of Le Monde, “extremely powerful . . . a gem.”',
  //       isbn10: '162872210X',
  //       isbn13: '9781628722109',
  //       pageCount: 120,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=O1ctAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Free Live Free',
  //       author: 'Gene Wolfe',
  //       publisher: 'Macmillan',
  //       description:
  //         '"Free Live Free," said the newspaper ad, and the out-of-work detective Jim Stubb, the occultist Madame Serpentina, the salesman Ozzie Barnes, and the overweight prostitute Candy Garth are brought together to live for a time in Free\'s old house, a house scheduled for demolition to make way for a highway. Free drops mysterious hints of his exile from his homeland, and of the lost key to his return. And so when demolition occurs and Free disappears, the four make a pact to continue the search, which ultimately takes them far beyond their wildest dreams. This is character-driven science fiction at its best by a writer whom, at the time of its first publication, the Chicago Sun-Times called "science fiction\'s best genuine novelist." At the Publisher\'s request, this title is being sold without Digital Rights Management Software (DRM) applied.',
  //       isbn10: '1466832428',
  //       isbn13: '9781466832428',
  //       pageCount: 416,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=cu1Ys0yAGqYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title:
  //         'Tryptophan Metabolism: Implications for Biological Processes, Health and Disease',
  //       author: 'Atilla Engin',
  //       publisher: 'Humana Press',
  //       description:
  //         'This book discusses the relationship between cellular immunity and tryptophan metabolism, as well as its products, serotonin and melatonin, in the development of several diseases and reappraises the common signal transduction pathways of the neurodegenerative diseases, carcinogenesis, immune tolerance, inflammation, hypersensitivity reactions, neuropsychiatric disorders, in addition to bacterial tryptophan biosynthesis and novel antimicrobials. Tryptophan Metabolism: Implications for Biological Processes, Health and Disease presents fundamental information on tryptophan related metabolic pathways and metabolites, implications of these products for specific biological processes, diseases and conditions. This book focuses on effects of tryptophan metabolites on human health and will appeal to researchers, clinicians and students within this field.',
  //       isbn10: '3319156306',
  //       isbn13: '9783319156309',
  //       pageCount: 382,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=ZHC6CAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //     {
  //       title: 'Data-Centric Business and Applications',
  //       author: 'Aneta Poniszewska-Marańda',
  //       publisher: 'Springer Nature',
  //       description:
  //         'This book explores various aspects of software creation and development as well as data and information processing. It covers relevant topics such as business analysis, business rules, requirements engineering, software development processes, software defect prediction, information management systems, and knowledge management solutions. Lastly, the book presents lessons learned in information and data management processes and procedures.',
  //       isbn10: '3030347060',
  //       isbn13: '9783030347062',
  //       pageCount: 267,
  //       photoUrl:
  //         'http://books.google.com/books/content?id=b0XEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //   ];
}
