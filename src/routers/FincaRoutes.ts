import { Request, Response, Router } from 'express'
import Finca from '../models/Finca'
class FincaRouter {
     router: Router; 
     constructor() {
          this.router = Router(); 
          this.routes();
     }

     async getFinca(req:Request, res:Response) {
          
          const finca = await Finca.find()
          res.json(finca);
     }

     async getFincaId(req:Request, res:Response) {
          const id = req.params.id
          const finca = await Finca.findById(id)
          res.json(finca);
     }

    async  createFinca(req:Request, res:Response) {
         
          const {nombre,capataz,numH } = req.body;
         
          const newFinca = new Finca({nombre, capataz, numH});
         await newFinca.save()
         res.json({ data: newFinca });
          
     }

     async updateFinca(req: Request, res: Response) {
          const id = req.params.id
          let finca = await Finca.findByIdAndUpdate(id, req.body,{new:true});
          res.json(finca);
          
          
     }

    async deleteFinca(req: Request, res: Response) {
          const id = req.params.id;
         await Finca.findByIdAndDelete(id);
         res.json({ mensaje:'Eliminado Correctamente'})
          
     }
     routes() {
          this.router.get('/', this.getFinca)
          this.router.get('/:id', this.getFincaId)
          this.router.post('/', this.createFinca)
          this.router.put('/:id', this.updateFinca)
          this.router.delete('/:id',this.deleteFinca)
}
}

const fincaRoutes = new FincaRouter();
export default fincaRoutes.router;