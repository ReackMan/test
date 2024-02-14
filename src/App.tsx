import React from 'react';
import './App.css';

type Service = {
    id: number
    head: number | null
    name: string
    node: number
    price: number
    sorthead: number
}

const response: { services: Service[] } = {
    'services': [
        {
            'id': 1,
            'head': null,
            'name': 'Проф.осмотр',
            'node': 0,
            'price': 100.0,
            'sorthead': 20
        },
        {
            'id': 2,
            'head': null,
            'name': 'Хирургия',
            'node': 1,
            'price': 0.0,
            'sorthead': 10
        },
        {
            'id': 3,
            'head': 2,
            'name': 'Удаление зубов',
            'node': 1,
            'price': 0.0,
            'sorthead': 10
        },
        {
            'id': 4,
            'head': 3,
            'name': 'Удаление зуба',
            'node': 0,
            'price': 800.0,
            'sorthead': 10
        },
        {
            'id': 5,
            'head': 3,
            'name': 'Удаление 8ого зуба',
            'node': 0,
            'price': 1000.0,
            'sorthead': 30
        },
        {
            'id': 6,
            'head': 3,
            'name': 'Удаление осколка зуба',
            'node': 0,
            'price': 2000.0,
            'sorthead': 20
        },
        {
            'id': 7,
            'head': 2,
            'name': 'Хирургические вмешательство',
            'node': 0,
            'price': 200.0,
            'sorthead': 10
        },
        {
            'id': 8,
            'head': 2,
            'name': 'Имплантация зубов',
            'node': 1,
            'price': 0.0,
            'sorthead': 20
        },
        {
            'id': 9,
            'head': 8,
            'name': 'Коронка',
            'node': 0,
            'price': 3000.0,
            'sorthead': 10
        },
        {
            'id': 10,
            'head': 8,
            'name': 'Слепок челюсти',
            'node': 0,
            'price': 500.0,
            'sorthead': 20
        }
    ]
}

type FilteredService = {
    id: number
    head: number | null
    name: string
    node: number
    price: number
    sorthead: number
    children: FilteredService[]
}


function App() {

    const filteredArray: FilteredService[] = [...response.services]
        .sort((s1, s2) => s1.sorthead - s2.sorthead)
        .map(s => ({ ...s, children: [] }))

    filteredArray.forEach(ch => {
        const index = filteredArray.findIndex(s => s.id === ch.head)
        if (index > -1) {
            filteredArray[index].children.push(ch)
        }
    })

    const resultServices: FilteredService[] = [...filteredArray]
        .filter(s => s.head === null)

    return (
        <Menu1 items={resultServices}/>
    );
}

const Menu1 = ({ items }: {items: FilteredService[]}) => {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name}
                    {item.children && <Menu1 items={item.children}/>}
                </li>
            ))}
        </ul>
    )
}

export default App;
