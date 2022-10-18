import Image from "next/image";
import { useState } from "react";

const input = 'cambodia'
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=72e13d5aa2d6447aad8121628221710 &q=${input}`)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}

function Page({ data }) {
  const [country, setCountry] = useState('cambodia')
  const [weatherList, setWeatherList] = useState(data)
  const location = weatherList.location;
  const current = weatherList.current;
  const search = async(e) => {
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=72e13d5aa2d6447aad8121628221710 &q=${e.target.value}`)
    const data = await res.json()
    if(data.error){
      console.log('error');
    }else{
      setWeatherList(data)
    }
  }
  // Render data...

  return (
    <>
      <div className="flex justify-center w-full">
      <form>   
        <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>   
            <input type="search" onChange={search} defaultValue={country} class="block px-4 py-2 pl-10 w-full m-2 rounded-md bg-transparent border text-white placeholder-gray-900" placeholder="Search Country..." required />
        </div>
    </form>
      </div>
      <div className="w-6/12 m-auto text-center min-h-screen p-3">
        <div className="flex justify-center ml-6">
          <h2 className="text-2xl z-50">{location.name}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <p>{current.condition.text}</p>
        <Image
          src={'https:' + current.condition.icon}
          alt={current.condition.text}
          width={100}
          height={100}
        />
        <h1 className="text-5xl relative">{current.temp_c} <sup className="text-xl absolute">o</sup></h1>
        
        <table class="w-full text-sm text-left text-gray-500 left-0 mt-3 absolute">
            <tbody>
              {Object.keys(location).map((key, index) => {
                return (
                  <>
                    <tr key={key} class="border-b">
                      <td class="py-2 px-6">
                        {key}
                      </td>
                      <th scope="row" class="px-6 font-medium text-gray-700 whitespace-nowrap dark:text-white">
                        {location[key]}
                      </th>
                    </tr>
                  </>
                )
              })}
              {Object.keys(current).map((key, index) => {
                return (
                  <>
                    <tr key={key} class="border-b">
                      <td class="py-2 px-6">
                        {key}
                      </td>
                      {key == 'condition' ?
                        <th scope="row" class="px-6 font-medium text-gray-700 whitespace-nowrap dark:text-white">
                            {current[key].text}
                        </th>
                        :
                        <th scope="row" class="px-6 font-medium text-gray-700 whitespace-nowrap dark:text-white">
                          {current[key]}
                        </th>
                      }
                    </tr>
                  </>
                )
              })}
            </tbody>
        </table>
      </div>
    </>
  )
}



export default Page