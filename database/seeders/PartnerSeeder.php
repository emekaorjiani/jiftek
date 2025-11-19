<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Partner;

/**
 * PartnerSeeder
 *
 * Seeds the partners table with company logos.
 * Uses local SVG logos stored in public/images/partners/
 * 
 * Logo files are located at: public/images/partners/{company-name}.svg
 * You can replace these SVG files with your own logos at any time.
 * 
 * Supported formats: SVG (recommended), PNG, JPG
 * To use different formats, update the file extensions in the logo paths below.
 */
class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        Partner::query()->delete();

        // Create partners with logos
        // Using local SVG logos stored in public/images/partners/
        // Logos can be replaced later by updating the files in public/images/partners/
        $partners = [
            [
                'name' => 'Microsoft',
                'logo' => '/images/partners/microsoft.svg',
                'website' => 'https://www.microsoft.com',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Amazon Web Services',
                'logo' => '/images/partners/aws.svg',
                'website' => 'https://aws.amazon.com',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Google Cloud',
                'logo' => '/images/partners/google-cloud.svg',
                'website' => 'https://cloud.google.com',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'IBM',
                'logo' => '/images/partners/ibm.svg',
                'website' => 'https://www.ibm.com',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Oracle',
                'logo' => '/images/partners/oracle.svg',
                'website' => 'https://www.oracle.com',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Salesforce',
                'logo' => '/images/partners/salesforce.svg',
                'website' => 'https://www.salesforce.com',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Adobe',
                'logo' => '/images/partners/adobe.svg',
                'website' => 'https://www.adobe.com',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'SAP',
                'logo' => '/images/partners/sap.svg',
                'website' => 'https://www.sap.com',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'name' => 'VMware',
                'logo' => '/images/partners/vmware.svg',
                'website' => 'https://www.vmware.com',
                'order' => 9,
                'is_active' => true,
            ],
            [
                'name' => 'Dell Technologies',
                'logo' => '/images/partners/dell.svg',
                'website' => 'https://www.dell.com',
                'order' => 10,
                'is_active' => true,
            ],
        ];

        foreach ($partners as $partnerData) {
            Partner::create($partnerData);
        }

        $this->command->info('Partners seeded successfully!');
        $this->command->info('Note: Logos are loaded from local SVG files in public/images/partners/');
        $this->command->info('You can replace these SVG files with your own logos at any time.');
    }
}

