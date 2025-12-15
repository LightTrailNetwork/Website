export interface Creed {
    id: string;
    title: string;
    date: string;
    description: string;
    text: string;
}

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    type: 'early' | 'council' | 'split' | 'reformation';
}

export interface Denomination {
    id: string;
    name: string;
    family: 'Catholic' | 'Orthodox' | 'Protestant';
    origin: string;
    keyBeliefs: string[];
    governance: string;
    sacraments: string;
}

export const creeds: Creed[] = [
    {
        id: 'apostles',
        title: "The Apostles' Creed",
        date: "c. 140-390 AD",
        description: "The earliest summary of the Christian faith, developed from baptismal confessions in the early church. It emphasizes the Trinity and the core narrative of redemption.",
        text: `I believe in God, the Father almighty,
creator of heaven and earth.

I believe in Jesus Christ, his only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died, and was buried;
he descended to the dead.
On the third day he rose again;
he ascended into heaven,
he is seated at the right hand of the Father,
and he will come to judge the living and the dead.

I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and the life everlasting. Amen.`
    },
    {
        id: 'nicene',
        title: "The Nicene Creed",
        date: "325 / 381 AD",
        description: "Formulated at the Council of Nicaea (325) and revised at Constantinople (381) to defend the full divinity of Jesus against Arianism. It is the only creed accepted by all three major branches of Christianity (Catholic, Orthodox, Protestant).",
        text: `We believe in one God, the Father, the Almighty, maker of heaven and earth, of all that is, seen and unseen.

We believe in one Lord, Jesus Christ, the only Son of God, eternally begotten of the Father, God from God, Light from Light, true God from true God, begotten, not made, of one Being with the Father. Through him all things were made.

For us and for our salvation he came down from heaven: by the power of the Holy Spirit he became incarnate from the Virgin Mary, and was made man. For our sake he was crucified under Pontius Pilate; he suffered death and was buried. On the third day he rose again in accordance with the Scriptures; he ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead, and his kingdom will have no end.

We believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father [and the Son]. With the Father and the Son he is worshiped and glorified. He has spoken through the Prophets. We believe in one holy catholic and apostolic Church. We acknowledge one baptism for the forgiveness of sins. We look for the resurrection of the dead, and the life of the world to come. Amen.`
    },
    {
        id: 'chalcedonian',
        title: "The Chalcedonian Definition",
        date: "451 AD",
        description: "Defined the 'Hypostatic Union'—that Jesus is fully God and fully Man in one person, without confusion or division.",
        text: `Following, then, the holy Fathers, we all with one consent teach men to confess one and the same Son, our Lord Jesus Christ, the same perfect in Godhead and also perfect in manhood; truly God and truly man, of a reasonable [rational] soul and body; consubstantial [co-essential] with the Father according to the Godhead, and consubstantial with us according to the Manhood; in all things like unto us, without sin; begotten before all ages of the Father according to the Godhead, and in these latter days, for us and for our salvation, born of the Virgin Mary, the Mother of God, according to the Manhood; one and the same Christ, Son, Lord, Only-begotten, to be acknowledged in two natures, inconfusedly, unchangeably, indivisibly, inseparably; the distinction of natures being by no means taken away by the union, but rather the property of each nature being preserved, and concurring in one Person and one Subsistence, not parted or divided into two persons, but one and the same Son, and only begotten, God the Word, the Lord Jesus Christ.`
    },
    {
        id: 'athanasian',
        title: "The Athanasian Creed",
        date: "c. 5th-6th Century",
        description: "A detailed statement on the Trinity and the Incarnation, focusing on the equality of the three persons of the Godhead.",
        text: `Whosoever will be saved, before all things it is necessary that he hold the catholic faith. Which faith except every one do keep whole and undefiled, without doubt he shall perish everlastingly.

And the catholic faith is this: That we worship one God in Trinity, and Trinity in Unity; neither confounding the Persons, nor dividing the Essence. For there is one Person of the Father; another of the Son; and another of the Holy Ghost. But the Godhead of the Father, of the Son, and of the Holy Ghost, is all one; the Glory equal, the Majesty coeternal...

...So the Father is God, the Son is God, and the Holy Ghost is God. And yet they are not three Gods, but one God...

...He therefore that will be saved, let him thus think of the Trinity.`
    }
];

export const timelineEvents: TimelineEvent[] = [
    { year: '33 AD', title: 'The Day of Pentecost', description: 'The Holy Spirit descends; birth of the Church.', type: 'early' },
    { year: '325 AD', title: 'Council of Nicaea', description: 'Constantine calls the first council to address Arianism; Nicene Creed formulated.', type: 'council' },
    { year: '381 AD', title: 'Council of Constantinople', description: 'Finalized the Nicene Creed; affirmed divinity of the Holy Spirit.', type: 'council' },
    { year: '451 AD', title: 'Council of Chalcedon', description: 'Defined the Hypostatic Union (Jesus: 1 Person, 2 Natures).', type: 'council' },
    { year: '1054 AD', title: 'The Great Schism', description: 'Official split between Western (Catholic) and Eastern (Orthodox) churches over papal authority and the filioque clause.', type: 'split' },
    { year: '1517 AD', title: 'The Reformation Begins', description: 'Martin Luther nails 95 Theses to the Wittenberg door.', type: 'reformation' },
    { year: '1521 AD', title: 'Diet of Worms', description: 'Luther refuses to recant: "Here I stand."', type: 'reformation' },
    { year: '1534 AD', title: 'Act of Supremacy', description: 'Henry VIII breaks with Rome; Church of England forms.', type: 'reformation' },
    { year: '1611 AD', title: 'KJV Published', description: 'The King James Bible becomes the standard English text.', type: 'reformation' },
    { year: '1738 AD', title: 'Wesleyan Revival', description: 'John & Charles Wesley lead the Methodist movement.', type: 'reformation' },
    { year: '1906 AD', title: 'Azusa Street Revival', description: 'Birth of modern Pentecostalism.', type: 'reformation' },
    { year: '1962 AD', title: 'Vatican II', description: 'Major modernizing council of the Catholic Church.', type: 'early' }
];

export const denominations: Denomination[] = [
    {
        id: 'catholic',
        name: 'Roman Catholic',
        family: 'Catholic',
        origin: 'Tracing back to Peter/Apostles (Institutionalized 4th-11th C.)',
        keyBeliefs: ['Papal Authority', '7 Sacraments', 'Transubstantiation', 'Tradition + Scripture'],
        governance: 'Episcopal (Hierarchical/Pope)',
        sacraments: '7 (Baptism, Confirmation, Eucharist, Penance, Anointing, Orders, Matrimony)'
    },
    {
        id: 'orthodox',
        name: 'Eastern Orthodox',
        family: 'Orthodox',
        origin: '1054 AD (Great Schism)',
        keyBeliefs: ['Ecumenical Councils', 'Mystical Theology', 'Icons', 'Rejection of Papal Supremacy'],
        governance: 'Episcopal (Patriarchs)',
        sacraments: '7 (called "Mysteries")'
    },
    {
        id: 'lutheran',
        name: 'Lutheran',
        family: 'Protestant',
        origin: '1517 AD (Martin Luther)',
        keyBeliefs: ['Sola Fide (Faith Alone)', 'Sola Scriptura', 'Consubstantiation (Real Presence)'],
        governance: 'Mixed (Episcopal/Congregational)',
        sacraments: '2 (Baptism, Eucharist) - sometimes Confession'
    },
    {
        id: 'reformed',
        name: 'Presbyterian / Reformed',
        family: 'Protestant',
        origin: '1530s (Calvin/Zwingli)',
        keyBeliefs: ['Sovereignty of God', 'Predestination', 'Covenant Theology', 'Spiritual Presence in Communion'],
        governance: 'Presbyterian (Elders)',
        sacraments: '2 (Baptism, Lord\'s Supper)'
    },
    {
        id: 'anglican',
        name: 'Anglican / Episcopalian',
        family: 'Protestant',
        origin: '1534 AD (Henry VIII)',
        keyBeliefs: ['Via Media (Middle Way)', 'Book of Common Prayer', 'Broad Theology'],
        governance: 'Episcopal (Bishops)',
        sacraments: '2 major (plus 5 lesser rites)'
    },
    {
        id: 'baptist',
        name: 'Baptist',
        family: 'Protestant',
        origin: '1609 AD (Smyth/Helwys)',
        keyBeliefs: ['Believer\'s Baptism', 'Autonomy of Local Church', 'Separation of Church & State'],
        governance: 'Congregational',
        sacraments: '2 Ordinances (not Sacraments)'
    },
    {
        id: 'methodist',
        name: 'Methodist',
        family: 'Protestant',
        origin: '1738 AD (Wesleys)',
        keyBeliefs: ['Arminianism (Free Will)', 'Christian Perfection', 'Social Holiness'],
        governance: 'Connectional (Bishops/Conferences)',
        sacraments: '2 (Baptism, Communion)'
    },
    {
        id: 'pentecostal',
        name: 'Pentecostal / Charismatic',
        family: 'Protestant',
        origin: '1906 AD (Azusa Street)',
        keyBeliefs: ['Baptism in Spirit', 'Speaking in Tongues', 'Miracles/Healing Today'],
        governance: 'Various (Congregational to Episcopal)',
        sacraments: '2 Ordinances'
    }
];
