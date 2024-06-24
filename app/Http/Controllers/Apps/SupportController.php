<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use Symfony\Component\Process\Process;

class SupportController extends Controller
{
    public function index()
    {
        $info = $this->backupInfo();
        $files = $this->filesList();
        return Inertia::render('Apps/Support/Index', compact('info', 'files'));
    }

    public function generate()
    {
        Artisan::call('backup:run');

        return to_route('backups.index');
    }

    public function monitor()
    {
        Artisan::call('backup:monitor');

        return to_route('backups.index');
    }

    public function restore(Request $request)
    {
        $fileName = $request->only('backup')['backup'];
        $command = "backup:restore --disk=local --backup=PESAM/$fileName --connection=mysql --no-interaction";
        Artisan::call($command);

        return to_route('backups.index');
    }

    public function clean()
    {
        Artisan::call('backup:clean');

        return to_route('backups.index');
    }

    private function filesList()
    {
        $directory = storage_path('app/PESAM'); // ruta del directorio que deseas leer
        $isAvailable = is_dir($directory);
        $files = $isAvailable ? scandir($directory) : [];
        
        $list = [];
        foreach($files as $file)
        {
            if($file != '.' && $file != '..') {
                $list[] = ['value' => $file, 'label' => $file];
            }
        }

        return $list;
    }

    private function backupInfo()
    {
        $process = new Process(['php', base_path('artisan'), 'backup:list']);
        $process->run();
        $output = $process->getOutput();

        $backupInfo = explode("\n", $output);

        // Remove the header and footer lines
        array_shift($backupInfo);
        array_shift($backupInfo);
        array_pop($backupInfo);

        $backups = [];
        foreach ($backupInfo as $key => $line) {
            $columns = preg_split('/\s*\|\s*/', trim($line));
            if(empty($columns[1])) {
                continue;
            }
            $backup = [
                'name' => $columns[1],
                'disk' => $columns[2],
                'reachable' => $columns[3] === '✅',
                'healthy' => $columns[4] === '✅',
                'num_backups' => (int) $columns[5],
                'newest_backup' => $columns[6],
                'used_storage' => $columns[7],
            ];
            $backups[] = $backup;
        }

        return $backups;
    }
}
