import { Plus, Search, FileDown, MoreHorizontal } from "lucide-react";
import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { Button } from "./components/ui/button";
import { Control, Input } from "./components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "./components/pagination";


export function App() {

  const {data: tagsResponse, isLoading} = useQuery({
    queryKey:['get-tags'],
    queryFn: async ()=>{
      const response = await fetch('http://localhost:3333/tags?_page=1&_per_page=10')
      const data = await response.json()
      
      console.log(data);
      return data
      
    },
  })

  return (
    <div className="py-10 space-y-8">
      <div>
        <Header/> 
        <Tabs/>
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant="primary">
              <Plus className="size-3" />
              create new
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Input variant="filter">
            <Search className="size-3"/>
            <Control placeholder="Search tags..."/>
          </Input>

          <Button>
            <FileDown className="size-3"/>       
            Export     
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of Videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
           {Array.from({length:10}).map((value, index)=>{
            return(
              <TableRow key={index}>
              <TableCell></TableCell>
             
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">React</span>
                  <span className="text-xm text-zinc-500">4f1545a4-d26d-4645-b857-8b1b27030a18</span>
                </div>
              </TableCell>
             
              <TableCell className="text-zinc-300">
                13 videos
              </TableCell> 

              <TableCell className="text-right">
                <Button size="icon">
                  <MoreHorizontal className="size-3"/>
                </Button>
              </TableCell>
            </TableRow>
            )
           })}
          </TableBody>
        </Table>

        <Pagination pages={0} items={0} page={0}/>
      </main>
    </div>
  );
}
